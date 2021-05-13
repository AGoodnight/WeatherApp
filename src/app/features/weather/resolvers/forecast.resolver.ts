import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable, zip } from "rxjs";
import { take, map } from "rxjs/operators";
import { select, Store } from '@ngrx/store';
import { WeatherService } from "../weather.service";
import { myCurrentWeatherSettingsSelector } from "../store/weather.selectors";
import { WEATHER_FEATURE_DEFAULTS } from "../constants/weather.constants";

@Injectable()
export class ForecastResolver implements Resolve<any>{
    constructor(
        @Inject(WeatherService) public weatherService:WeatherService,
        @Inject(Store) public ngrxstore:Store<any>
    ){}
    
    resolve(route:ActivatedRouteSnapshot){
        console.log('forecast resolver');
        return new Observable<ForecastReport>((obs)=>{
            this.ngrxstore.pipe(select(myCurrentWeatherSettingsSelector)).subscribe((state)=>{
                // First check for a saved location in thier local storage
                if(!state.zip){
                    navigator.geolocation.getCurrentPosition((location)=>{ 
                        this.weatherService.getLocationForecast(
                            <GeoCoordinates>{
                                lat:location.coords.latitude,
                                lon:location.coords.longitude
                            },
                            {units:state.unit || WEATHER_FEATURE_DEFAULTS.DEFAULT_UNITS, limit:WEATHER_FEATURE_DEFAULTS.DEFAULT_FORECAST_RANGE}
                        ).pipe(take(1)).subscribe((forecast:ForecastReport)=>{
                            obs.next(forecast);
                            obs.complete();
                        })
                    });
                    // obs.next({} as ForecastReport);
                    // obs.complete();
                }else{
                    this.weatherService.getZipForecast(
                        state.zip,
                        {units:state.unit || WEATHER_FEATURE_DEFAULTS.DEFAULT_UNITS, limit:WEATHER_FEATURE_DEFAULTS.DEFAULT_FORECAST_RANGE}
                    ).pipe(take(1)).subscribe((forecast:ForecastReport)=>{
                        obs.next(forecast);
                        obs.complete();
                    })
                }
            });
        });
    }
}