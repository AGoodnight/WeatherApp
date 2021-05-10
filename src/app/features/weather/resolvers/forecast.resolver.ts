import { Inject, Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { combineLatest, merge, forkJoin, Observable, zip } from "rxjs";
import { take, map } from "rxjs/operators";
import { select, Store } from '@ngrx/store';
import { WeatherService } from "../weather.service";
import { myCurrentWeatherLocationSelector, myUnitSelector } from "../store/weather.selectors";
import { WEATHER_FEATURE_DEFAULTS } from "../constants/weather.constants";

@Injectable()
export class ForecastResolver implements Resolve<any>{
    constructor(
        @Inject(WeatherService) public weatherService:WeatherService,
        @Inject(Store) public ngrxstore:Store<any>
    ){}
    
    resolve(route:ActivatedRouteSnapshot){
        return new Observable<ForecastReport>((obs)=>{
            zip(
                this.ngrxstore.pipe(select(myCurrentWeatherLocationSelector)),
                this.ngrxstore.pipe(select(myUnitSelector))
            ).pipe(take(1),map(([loc,unit])=>({
                loc:<GeoCoordinates>loc,unit:<TemperatureUnit>unit
            }))).subscribe((state)=>{
                // First check for a saved location in thier local storage
                if(!state.loc){
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
                }else{
                    this.weatherService.getLocationForecast(
                        state.loc,
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