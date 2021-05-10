import { createSelector } from '@ngrx/store';
import { getWeatherState } from './weather.reducer';

export const myCurrentWeatherLocationSelector = createSelector(
    getWeatherState,
    (state)=>{
        let myCoordinates:GeoCoordinates | null = (state.my_location_lon && state.my_location_lat) ? {
            lat:state.my_location_lat,
            lon:state.my_location_lon
        }: null ;
        return myCoordinates;
    }
)

export const myUnitSelector = createSelector(
    getWeatherState,
    (state)=>{
        return state.my_unit;
    }
)