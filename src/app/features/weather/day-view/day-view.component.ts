import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { skip, take } from 'rxjs/operators';
import { WeatherService } from '../weather.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToggleMyUnit } from '../store/weather.actions';
import { DismissToasts, TriggerToast } from 'src/app/shared/notification';
import { WEATHER_FEATURE_DEFAULTS, WEATHER_TEMPRATURE_SYMBOLS } from '../constants/weather.constants';
import { KillZombies } from 'src/app/shared/kill-zombies/kill-zombies';
import { RouteIsLoading } from 'src/app/shared/navigation/store/navigation.actions';
import { myCurrentWeatherSettingsSelector } from '../store/weather.selectors';

@Component({
    selector:'day-view',
    templateUrl:'./day-view.component.html'
})
export class DayView extends KillZombies(){

    public conditions:WeatherReport = {} as WeatherReport;
    public unitLabel:string = WEATHER_TEMPRATURE_SYMBOLS[WEATHER_FEATURE_DEFAULTS.DEFAULT_UNITS as string] as string;

    constructor(
        public weatherService:WeatherService,
        public activatedRoute:ActivatedRoute,
        public sanitizer:DomSanitizer,
        public ngrxstore:Store<any>
    ){
        super();
        this.conditions = this.activatedRoute.snapshot.data.currentConditions;
        this.conditions.icon = this.sanitizer.bypassSecurityTrustUrl(this.conditions.icon);
        console.log('dayview loaded');

        // get any Initial Unit preference
        this.ngrxstore.select(myCurrentWeatherSettingsSelector).pipe(take(1)).subscribe((state)=>{ 
            if(state.unit){
                this.unitLabel = WEATHER_TEMPRATURE_SYMBOLS[state.unit as string] as string;
            } 
        });

        // load data on subsequent Unit changes.
        let unitSub = this.ngrxstore.select(myCurrentWeatherSettingsSelector).pipe(skip(1)).subscribe((state)=>{
            console.log('dayview')
            this.ngrxstore.dispatch(RouteIsLoading(true));
            if(state.zip){
                this.weatherService.getCurrentWeatherForZip(
                    state.zip,
                    {units:state.unit}
                ).subscribe((updatedConditions:WeatherReport)=>{
                    this.conditions = Object.assign({},updatedConditions);
                    this.conditions.units = state.unit;
                    this.unitLabel = WEATHER_TEMPRATURE_SYMBOLS[state.unit as string] as string;
                    this.ngrxstore.dispatch(RouteIsLoading(false));
                    this.ngrxstore.dispatch(TriggerToast({
                        message:"Changes Saved",
                        style:"success",
                        ttl:3
                    }))
                })
            }else{
                this.weatherService.getCurrentWeatherForLocation(
                    this.conditions.coord,
                    {units:state.unit}
                ).subscribe((updatedConditions:WeatherReport)=>{
                    this.conditions = Object.assign({},updatedConditions);
                    this.conditions.units = state.unit;
                    this.unitLabel = WEATHER_TEMPRATURE_SYMBOLS[state.unit as string] as string;
                    this.ngrxstore.dispatch(RouteIsLoading(false));
                    this.ngrxstore.dispatch(TriggerToast({
                        message:"Changes Saved",
                        style:"success",
                        ttl:3
                    }))
                })
            }
        })

        this.storeZombieByKey('unit',unitSub);
    }

    swapMyUnit($event:unknown){
        this.ngrxstore.dispatch(DismissToasts());
        this.ngrxstore.dispatch(ToggleMyUnit());
    }
}