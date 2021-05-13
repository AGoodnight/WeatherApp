import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { SetMyZip, SetMyUnit, ToggleMyUnit } from './weather.actions';


export interface WeatherState{
    my_location_zip:string|null,
    my_unit:TemperatureUnit
}

let _currentLocalState:WeatherState;
if(localStorage.getItem('weather')){
    _currentLocalState = JSON.parse( localStorage.getItem('weather') as any );
}else{
    _currentLocalState = {
        my_location_zip:null,
        my_unit:'imperial'
    }
}

export const initialState:WeatherState = {
    my_location_zip:(_currentLocalState.my_location_zip) ? _currentLocalState.my_location_zip : null,
    my_unit:(_currentLocalState.my_unit) ? _currentLocalState.my_unit : 'imperial',
}

export const WeatherReducer = createReducer(initialState,
    on(SetMyZip,
        (state,payload)=>({
            ...state,
            my_location_zip:payload.zip
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