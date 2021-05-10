import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { skip } from 'rxjs/operators';
import { WeatherService } from '../weather.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToggleMyUnit } from '../store/weather.actions';
import { myUnitSelector } from '../store/weather.selectors';

@Component({
    selector:'day-view',
    templateUrl:'./day-view.component.html'
})
export class DayView{

    public conditions:WeatherReport = {} as WeatherReport;

    constructor(
        public weatherService:WeatherService,
        public activatedRoute:ActivatedRoute,
        public sanitizer:DomSanitizer,
        public ngrxstore:Store<any>
    ){
        this.conditions = this.activatedRoute.snapshot.data.currentConditions;
        this.conditions.icon = this.sanitizer.bypassSecurityTrustUrl(this.conditions.icon);

        this.ngrxstore.select(myUnitSelector).pipe(skip(1)).subscribe((unit)=>{
            this.weatherService.getCurrentWeatherForLocation(
                this.conditions.coord,
                {units:unit}
            ).subscribe((updatedConditions:WeatherReport)=>{
                console.log(updatedConditions)
                this.conditions = Object.assign({},updatedConditions);
                this.conditions.units = unit;
            })
        })
    }

    swapMyUnit($event:unknown){
        this.ngrxstore.dispatch(ToggleMyUnit());
    }
}