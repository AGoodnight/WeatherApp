import { createSelector } from '@ngrx/store';
import { getWeatherState } from './weather.reducer';

export const myCurrentWeatherSettingsSelector = createSelector(
    getWeatherState,
    (state)=>{
        return {
            unit:state.my_unit,
            zip:state.my_location_zip
        };
    }
)