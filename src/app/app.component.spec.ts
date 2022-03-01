/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WeatherService } from './features/weather/weather.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NAVIGATION_CONFIG } from './shared/navigation/navigation.interface';
import { TopNavComponent } from './shared/navigation/top-nav/top-nav.component';
import { ToastComponent } from './shared/notification/toasts/toast.component';
import { initialState } from './shared/navigation/store/navigation.reducer';
import { weatherRoutes } from './features/weather/weather.routing';
import { routes } from './app-routing.module';
import { WEATHER_PATHS } from './features/weather/constants/weather.constants';

// Mock the Injection Token
const NAVIGATION_CONFIG_PROVIDER = [
  {
    provide: NAVIGATION_CONFIG,
    useValue: {
      routes: WEATHER_PATHS,
    },
  },
];

describe('AppComponent', () => {
  let actions$: Observable<Action>;
  // let httpMock: HttpTestingController;
  // let weatherService: WeatherService;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([...routes, ...weatherRoutes]),
        HttpClientTestingModule,
      ],
      declarations: [AppComponent, TopNavComponent, ToastComponent],
      providers: [
        provideMockActions(() => actions$),
        provideMockStore({
          initialState,
        }),
        WeatherService,
        NAVIGATION_CONFIG_PROVIDER,
      ],
    }).compileComponents();

    // weatherService = TestBed.inject(WeatherService);
    // httpMock = TestBed.inject(HttpTestingController);
  });

  // Neccessary to create component before each test
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  // Important, removes old state
  afterEach(() => {
    fixture.destroy();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'weatherApp'`, () => {
    expect(app.title).toEqual('weatherApp');
  });
});
