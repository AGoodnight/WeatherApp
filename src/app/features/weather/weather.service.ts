import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as moment from "moment";
import { combineLatest, Observable, throwError } from "rxjs";
import { catchError, take } from 'rxjs/operators';
import { API_KEY, BLOB_ENDPOINTS, WEATHER_ENDPOINTS } from "./constants/api.constants";
import { WEATHER_FEATURE_DEFAULTS } from "./constants/weather.constants";

@Injectable()
export class WeatherService{
    
    constructor(public http:HttpClient){}

    public getCurrentWeatherForLocation(coordinates:GeoCoordinates,params:Dictionary = { units:'imperial' }):Observable<any>{
        return new Observable<WeatherReport>((obs)=>{
            this.http.get<WeatherResponse>(WEATHER_ENDPOINTS.CURRENT_WEATHER,{
                params:Object.assign(<HttpParams>{},params,{
                    lat:String(coordinates.lat),
                    lon:String(coordinates.lon),
                    appid:String(API_KEY),
                })
            }).pipe(take(1),catchError(err => throwError(err))).subscribe((weather)=>{
                this.getWeatherIcon(weather.weather[0].icon).pipe(take(1)).subscribe((icon)=>{
                    obs.next(Object.assign({},weather,{
                        icon:icon,
                        units:params.units || 'imperial'
                    }) as WeatherReport);
                    obs.complete();
                })
            });
        })
    }

    public getHistoricalWeatherForLocation(coordinates:GeoCoordinates,params:Dictionary = { 
        units:'imperial',
        date:'1984-04-01' 
    }):Observable<any>{
        let _start = moment( String(params.date)+' :00:00' ).valueOf();
        let _end = moment( String(params.date)+' :23:59' ).valueOf();
        let _params = Object.assign({},params);
        delete _params.date;
        return this.http.get<WeatherResponse>(WEATHER_ENDPOINTS.HISTORICAL_WEATHER,{
            params:Object.assign(<HttpParams>{},_params,{
                lat:String(coordinates.lat),
                lon:String(coordinates.lon),
                type:'hour',
                start:_start,
                end:_end,
                appid:String(API_KEY),
            })
        }).pipe(take(1),catchError(err => throwError(err)));
    }

    public getLocationForecast(coordinates:GeoCoordinates,params:Dictionary = { units:'imperial'}):Observable<any>{
        return new Observable((obs)=>{
            this.http.get<ForecastResponse>(WEATHER_ENDPOINTS.FORECAST,{
                params:Object.assign(<HttpParams>{},params,{
                    lat:String(coordinates.lat),
                    lon:String(coordinates.lon),
                    appid:String(API_KEY),
                })
            }).pipe(take(1),catchError(err => throwError(err))).subscribe((forecast)=>{
                let forecastClone:ForecastResponse = Object.assign({},forecast) as ForecastResponse;
                let forecastReport:ForecastReport = Object.assign({},forecast) as ForecastReport;

                let iconsForCondtions = forecastClone.list.map((weather:WeatherResponse,index:number)=>{
                    return this.getWeatherIcon(weather.weather[0].icon).pipe(take(1))
                });

                combineLatest(iconsForCondtions).subscribe((response:any)=>{
                    forecastClone.list.map((f:WeatherResponse,index:number)=>{
                        forecastReport.list[index] = Object.assign({},f,{
                            icon:response[index],
                            units:params.units || WEATHER_FEATURE_DEFAULTS.DEFAULT_UNITS
                        }) as WeatherReport;
                    })

                    obs.next(forecastReport);
                    obs.complete();
                });
            });
        });
    }

    public getWeatherIcon(iconName:string):Observable<any>{
        return new Observable((obs)=>{
            this.http.get(BLOB_ENDPOINTS.ICON+'/'+iconName+'.png',{responseType:'blob'}).pipe(take(1)).subscribe((imageBlob:Blob)=>{
                let reader = new FileReader();
                reader.readAsDataURL(imageBlob);
                reader.onloadend = function(){
                    obs.next(reader.result);
                    obs.complete();
                };
            });
        }).pipe(take(1),catchError(err => throwError(err)));
    }
}