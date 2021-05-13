import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { select, Store } from '@ngrx/store';
import { WeatherService } from "../weather.service";
import { myCurrentWeatherSettingsSelector } from "../store/weather.selectors";
import { WEATHER_FEATURE_DEFAULTS } from "../constants/weather.constants";

@Injectable()
export class CurrentConditionsResolver implements Resolve<any>{
    constructor(
        @Inject(WeatherService) public weatherService:WeatherService,
        @Inject(Store) public ngrxstore:Store<any>
    ){}
    
    resolve(_route:ActivatedRouteSnapshot){
        console.log('condition resolv');
        return new Observable<WeatherReport>((obs)=>{
            this.ngrxstore.pipe(select(myCurrentWeatherSettingsSelector)).subscribe((state)=>{
            // First check for a saved location in thier local storage
                if(!state.zip){
                    navigator.geolocation.getCurrentPosition((location)=>{ 
                        this.weatherService.getCurrentWeatherForLocation(
                            <GeoCoordinates>{
                                lat:location.coords.latitude,
                                lon:location.coords.longitude
                            },
                            {units:state.unit || WEATHER_FEATURE_DEFAULTS.DEFAULT_UNITS}
                        ).pipe(take(1)).subscribe((weather:WeatherReport)=>{
                            obs.next(weather);
                            obs.complete();
                        })
                    });
                    // obs.next({} as WeatherReport);
                    // obs.complete();
                }else{
                    this.weatherService.getCurrentWeatherForZip(
                        state.zip,
                        {units:state.unit || WEATHER_FEATURE_DEFAULTS.DEFAULT_UNITS}
                    ).pipe(take(1)).subscribe((weather:WeatherReport)=>{
                        this.weatherService.getWeatherIcon(weather.weather[0].icon).pipe(take(1)).subscribe((icon)=>{
                            obs.next(weather);
                            obs.complete();
                        })
                    });
                }
            })
        });
    }
}