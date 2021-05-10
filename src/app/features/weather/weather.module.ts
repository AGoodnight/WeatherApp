import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DayView } from './day-view/day-view.component';
import { WeatherRoutingModule } from './weather.routing';
import { CurrentConditionsResolver } from './resolvers/current-conditions-resolver';
import { WeatherService } from './weather.service';
import { HistoricalConditionsResolver } from './resolvers/historical-conditions-resolver';
import { ForecastResolver } from './resolvers/forecast.resolver';
import { Forecast } from './forecast/forecast.component';

@NgModule({
    declarations:[
        DayView,
        Forecast
    ],
    imports:[
        CommonModule,
        BrowserModule,
        WeatherRoutingModule
    ],
    providers:[
        CurrentConditionsResolver,
        HistoricalConditionsResolver,
        ForecastResolver,
        WeatherService
    ],
    exports:[
        RouterModule
    ]
})
export class WeatherModule { }