import { Inject, Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { select, Store } from '@ngrx/store';
import { WeatherService } from "../weather.service";
import { myCurrentWeatherLocationSelector } from "../store/weather.selectors";
import * as moment from "moment";

@Injectable()
export class HistoricalConditionsResolver implements Resolve<any>{
    constructor(
        @Inject(WeatherService) public weatherService:WeatherService,
        @Inject(Store) public ngrxstore:Store<any>
    ){}
    
    resolve(route:ActivatedRouteSnapshot){
        return new Observable((obs)=>{
            this.ngrxstore.pipe(select(myCurrentWeatherLocationSelector)).pipe(take(1)).subscribe((state)=>{

                // First check for a saved location in thier local storage
                if(state){
                    this.weatherService.getHistoricalWeatherForLocation(state).pipe(take(1)).subscribe((weather:WeatherResponse)=>{
                        this.weatherService.getWeatherIcon(weather.weather[0].icon).pipe(take(1)).subscribe((icon)=>{
                            obs.next(Object.assign({},weather,{icon:icon}));
                            obs.complete();
                        })
                    })
                // Otherwise use geolocation to assume thier location
                }else{
                    navigator.geolocation.getCurrentPosition((location)=>{ 
                        console.log(location)
                        this.weatherService.getHistoricalWeatherForLocation(
                            <GeoCoordinates>{
                                lat:location.coords.latitude,
                                lon:location.coords.longitude
                            }
                        ).subscribe((weather:WeatherResponse)=>{
                            this.weatherService.getWeatherIcon(weather.weather[0].icon).pipe(take(1)).subscribe((icon)=>{
                                obs.next(Object.assign({},weather,{icon:icon}));
                                obs.complete();
                            })
                        });
                    },(err)=>{ 
                        if(err){
                            obs.next(null);
                            obs.complete();
                        }
                    });
                }
            });
           
        });
    }
}