import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherModule } from './features/weather/weather.module';
import { NavigationModule } from './shared/navigation/navigation.module';
import { reducers, metaReducers } from './localstorage.configuration';
import { NotificationModule } from './shared/notification';
import { NAVIGATION_CONFIG } from './shared/navigation/navigation.interface';
import { WEATHER_PATHS } from './features/weather/constants/weather.constants';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    WeatherModule,
    NavigationModule.forRoot(),
    NotificationModule.forRoot(),
    EffectsModule.forRoot(),
    StoreModule.forRoot(reducers,{metaReducers})
  ],
  providers: [
    {
      provide: NAVIGATION_CONFIG,
      useValue: {
        routes: WEATHER_PATHS,
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
