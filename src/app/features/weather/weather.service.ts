import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as _ from 'lodash';
import * as moment from "moment";
import { combineLatest, Observable, throwError } from "rxjs";
import { catchError, take } from 'rxjs/operators';
import { API_KEY, BLOB_ENDPOINTS, WEATHER_ENDPOINTS } from "./constants/api.constants";
import { WEATHER_FEATURE_DEFAULTS, WEATHER_TEMPRATURE_UNITS } from "./constants/weather.constants";
import { parseUnixDate } from '../../shared/utility/parsers';

@Injectable()
export class WeatherService{
    
    constructor(public http:HttpClient){}

    public getCurrentWeatherForLocation(coordinates:GeoCoordinates,params:Dictionary = { units:WEATHER_FEATURE_DEFAULTS.DEFAULT_UNITS }):Observable<any>{
        return new Observable<WeatherReport>((obs)=>{
            this.http.get<WeatherResponse>(WEATHER_ENDPOINTS.CURRENT_WEATHER,{
                params:Object.assign(<HttpParams>{},params,{
                    lat:String(coordinates.lat),
                    lon:String(coordinates.lon),
                    appid:String(API_KEY),
                })
            }).pipe(take(1),catchError(err => throwError(err))).subscribe((weather)=>{
                this.getWeatherIcon(weather.weather[0].icon).pipe(take(1)).subscribe((icon)=>{

                    let _units:string = params.units as string || WEATHER_FEATURE_DEFAULTS.DEFAULT_UNITS as string;

                    let _interpretedData:WeatherReportExtras = Object.assign({},parseUnixDate(weather.dt,_units),{
                        icon:icon,
                        units:_units
                    });

                    obs.next(Object.assign({},weather,_interpretedData) as WeatherReport);
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

    public getLocationForecast(coordinates:GeoCoordinates,params:Dictionary = { units:WEATHER_FEATURE_DEFAULTS.DEFAULT_UNITS}):Observable<any>{
        return new Observable((obs)=>{
            this.http.get<ForecastResponse>(WEATHER_ENDPOINTS.FORECAST,{
                params:Object.assign(<HttpParams>{},params,{
                    lat:String(coordinates.lat),
                    lon:String(coordinates.lon),
                    appid:String(API_KEY),
                })
            }).pipe(take(1),catchError(err => throwError(err))).subscribe((forecast)=>{
                let forecastClone:ForecastResponse = Object.assign({},forecast) as ForecastResponse;
                let forecastReport:ForecastReport = {} as ForecastReport;
                forecastReport = Object.assign({},forecast) as ForecastReport;
                forecastReport.report = [] as WeatherReportDay[];
                forecastReport.units = params.units as string || WEATHER_FEATURE_DEFAULTS.DEFAULT_UNITS as string;

                let iconsForConditions = forecastClone.list.map((weather:WeatherResponse,index:number)=>{
                    return this.getWeatherIcon(weather.weather[0].icon).pipe(take(1))
                });

                combineLatest(iconsForConditions).subscribe((response:any)=>{

                    forecastClone.list.map((f:WeatherResponse,index:number)=>{

                        let _units:string = forecastReport.units;
                        let _dateObject:ParsedDateObject = parseUnixDate(f.dt,_units);

                        let _interpretedData:WeatherReportExtras = Object.assign({},
                            _dateObject,{
                            icon:response[index],
                            units:_units
                        });

                        // Use a long number ( day and month ) as index to maintain order and account for monthly day resets.
                        let _uniqueDayId = _interpretedData.weekday_as_unique_index;

                        if(!forecastReport.report[_uniqueDayId]){
                            forecastReport.report[_uniqueDayId] = {} as WeatherReportDay;
                        }
                        if(!forecastReport.report[_uniqueDayId].weather){
                            forecastReport.report[_uniqueDayId].weather = [];
                        }
                        forecastReport.report[_uniqueDayId].weather.push(
                            Object.assign({},f,_interpretedData) as WeatherReport
                        );
                        forecastReport.report[_uniqueDayId] = Object.assign({},
                            forecastReport.report[_uniqueDayId],
                            _dateObject
                        );
                    })

                    // Flatten the array, removing unused indexes
                    forecastReport.report = _.compact(forecastReport.report);

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