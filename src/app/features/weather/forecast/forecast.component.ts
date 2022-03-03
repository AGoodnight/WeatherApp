import { style } from '@angular/animations';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { skip } from 'rxjs/operators';
import { KillZombies } from 'src/app/shared/kill-zombies/kill-zombies';
import { RouteIsLoading } from 'src/app/shared/navigation/store/navigation.actions';
import { navigationStateSelector } from 'src/app/shared/navigation/store/navigation.selectors';
import {
  WEATHER_FEATURE_DEFAULTS,
  WEATHER_TEMPRATURE_SYMBOLS,
} from '../constants/weather.constants';
import { ToggleMyUnit } from '../store/weather.actions';
import { myCurrentWeatherSettingsSelector } from '../store/weather.selectors';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.scss'],
})
export class Forecast extends KillZombies() {
  public conditions: ForecastReport = {} as ForecastReport;
  public conditionsReport: any = {};
  public unitLabel: string = WEATHER_TEMPRATURE_SYMBOLS[
    WEATHER_FEATURE_DEFAULTS.DEFAULT_UNITS as TemperatureUnit
  ] as string;
  public dataIsLoading: boolean = false;

  constructor(
    public ngrxstore: Store<any>,
    public weatherService: WeatherService,
    public sanitizer: DomSanitizer,
    public activatedRoute: ActivatedRoute
  ) {
    super();
    this.conditions = this.activatedRoute.snapshot.data.forecastReport;
    this.conditionsReport = this.conditions.report;
    console.log('forecast loaded', this.conditionsReport);

    let navigationSub = this.ngrxstore
      .select(navigationStateSelector)
      .subscribe((state) => {
        this.dataIsLoading = state.route_is_loading;
      });

    let unitSub = this.ngrxstore
      .select(myCurrentWeatherSettingsSelector)
      .pipe(skip(1))
      .subscribe((state) => {
        console.log('forecast');
        this.ngrxstore.dispatch(RouteIsLoading(true));
        if (state.zip) {
          this.weatherService
            .getZipForecast(state.zip, { units: state.unit })
            .subscribe((updatedConditions: ForecastReport) => {
              this.conditions = Object.assign({}, updatedConditions);
              this.conditions.units = state.unit;
              this.conditionsReport = updatedConditions.report;
              this.unitLabel = WEATHER_TEMPRATURE_SYMBOLS[state.unit] as string;
              this.ngrxstore.dispatch(RouteIsLoading(false));
            });
        } else {
          this.weatherService
            .getLocationForecast(this.conditions.city.coord, {
              units: state.unit,
            })
            .subscribe((updatedConditions: ForecastReport) => {
              this.conditions = Object.assign({}, updatedConditions);
              this.conditions.units = state.unit;
              this.conditionsReport = updatedConditions.report;
              this.unitLabel = WEATHER_TEMPRATURE_SYMBOLS[state.unit] as string;
              this.ngrxstore.dispatch(RouteIsLoading(false));
            });
        }
      });

    this.storeZombieByKey('unit', unitSub);
    this.storeZombieByKey('navigation', navigationSub);
  }

  swapMyUnit($event: unknown) {
    this.ngrxstore.dispatch(ToggleMyUnit());
  }
}
