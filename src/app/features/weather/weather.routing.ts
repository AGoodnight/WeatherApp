import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WEATHER_PATHS } from './constants/weather.constants';
import { DayView } from './day-view/day-view.component';
import { Forecast } from './forecast/forecast.component';
import { CurrentConditionsResolver } from './resolvers/current-conditions-resolver';
import { ForecastResolver } from './resolvers/forecast.resolver';

export const weatherRoutes: Routes = [
	{ path:WEATHER_PATHS.CURRENT,component:DayView, 
    resolve:{
        currentConditions:CurrentConditionsResolver
    }
  },
  { path:WEATHER_PATHS.FORECAST,component:Forecast, 
    resolve:{
        forecastReport:ForecastResolver
    }
  },
  // { path:WEATHER_PATHS.DATE+'/:date',component:DayView, 
  //   resolve:{
  //       currentConditions:HistoricalConditionsResolver
  //   }
  // }
]

@NgModule({
  imports:[RouterModule.forChild(weatherRoutes)],
  exports:[RouterModule]
})

export class WeatherRoutingModule {}
