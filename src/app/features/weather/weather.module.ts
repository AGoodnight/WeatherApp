import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DayView } from './day-view/day-view.component';
import { WeatherRoutingModule } from './weather.routing';
import { CurrentConditionsResolver } from './resolvers/current-conditions-resolver';
import { WeatherService } from './weather.service';
import { ForecastResolver } from './resolvers/forecast.resolver';
import { Forecast } from './forecast/forecast.component';
import { BackgroundTemperature } from 'src/app/shared/utility/background-temperature.directive';

@NgModule({
  declarations: [DayView, Forecast, BackgroundTemperature],
  imports: [CommonModule, BrowserModule, WeatherRoutingModule],
  providers: [CurrentConditionsResolver, ForecastResolver, WeatherService],
  exports: [RouterModule],
})
export class WeatherModule {}
