import { Statement } from '@angular/compiler';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { WEATHER_FEATURE_DEFAULTS, WEATHER_TEMPRATURE_SYMBOLS, WEATHER_TEMPRATURE_UNITS } from './features/weather/constants/weather.constants';
import { SetMyZip, ToggleMyUnit } from './features/weather/store/weather.actions';
import { myCurrentWeatherSettingsSelector } from './features/weather/store/weather.selectors';
import { WeatherService } from './features/weather/weather.service';
import { KillZombies } from './shared/kill-zombies/kill-zombies';
import { NAVIGATION_CONFIG, NavigationConfigInterface } from './shared/navigation/navigation.interface';
import { NavigationService } from './shared/navigation/navigation.service';
import { navigationStateSelector } from './shared/navigation/store/navigation.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent extends KillZombies() {

  title:string = 'weatherApp';
  route_is_loading:boolean = false;
  appUnitLabel:string = WEATHER_TEMPRATURE_SYMBOLS[WEATHER_FEATURE_DEFAULTS.DEFAULT_UNITS as string] as string;

  public zipCodeValue:string = '';

  constructor(
    public router:Router,
    public ngrxstore:Store<any>,
    public navigationService:NavigationService,
    public weatherService:WeatherService,
    @Inject(NAVIGATION_CONFIG) public navConfig:NavigationConfigInterface
  ){
    super();

    let navigationSub = this.ngrxstore.select(navigationStateSelector).subscribe((state)=>{
      this.route_is_loading = state.route_is_loading
    })

    let unitSub = this.ngrxstore.select(myCurrentWeatherSettingsSelector).subscribe((state)=>{
      this.appUnitLabel = WEATHER_TEMPRATURE_SYMBOLS[state.unit as string] as string;
    });

    this.storeZombieByKey('nav',navigationSub);
    this.storeZombieByKey('unit',unitSub);
  }

  saveMyZip($event:unknown){
    this.ngrxstore.dispatch(SetMyZip(this.zipCodeValue));
  }

  swapMyUnit($event:unknown){
    this.ngrxstore.dispatch(ToggleMyUnit());
  }
}
