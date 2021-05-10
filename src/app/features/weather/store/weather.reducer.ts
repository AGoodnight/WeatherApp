import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { SetMyLocation, SetMyUnit, ToggleMyUnit } from './weather.actions';


export interface WeatherState{
    my_location_lat:number|null,
    my_location_lon:number|null,
    my_unit:TemperatureUnit
}

let _currentLocalState:WeatherState;
if(localStorage.getItem('weather')){
    _currentLocalState = JSON.parse( localStorage.getItem('weather') as any );
}else{
    _currentLocalState = {
        my_location_lat:null,
        my_location_lon:null,
        my_unit:'imperial'
    }
}

export const initialState:WeatherState = {
    my_location_lat:(_currentLocalState.my_location_lat) ? _currentLocalState.my_location_lat : null,
    my_location_lon:(_currentLocalState.my_location_lon) ? _currentLocalState.my_location_lon : null,
    my_unit:(_currentLocalState.my_unit) ? _currentLocalState.my_unit : 'imperial',
}

export const WeatherReducer = createReducer(initialState,
    on(SetMyLocation,
        (state,coords)=>({
            ...state,
            my_location_lat:coords.lat,
            my_location_lon:coords.lon
        })
    ),
    on(SetMyUnit,
        (state,payload)=>({
            ...state,
            my_unit:payload.unit
        })
    ),
    on(ToggleMyUnit,
        (state)=>({
            ...state,
            my_unit:(()=>{
                return ( state.my_unit === 'imperial' ) ? 'metric' : 'imperial'; 
            })()
        })
    )
)

export const getWeatherState = createFeatureSelector<WeatherState>('weather')