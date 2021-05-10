import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { skip } from 'rxjs/operators';
import { myUnitSelector } from '../store/weather.selectors';
import { WeatherService } from '../weather.service';

@Component({
    selector:'forecast',
    templateUrl:'./forecast.component.html'
})
export class Forecast{
    
    public conditions:ForecastReport = {} as ForecastReport;
    public conditionsList:WeatherReport[] = [];

    constructor(
        public ngrxstore:Store<any>,
        public weatherService:WeatherService,
        public sanitizer:DomSanitizer,
        public activatedRoute:ActivatedRoute
    ){
        this.conditions = this.activatedRoute.snapshot.data.forecastReport;
        this.conditionsList = this.conditions.list;
    }
}