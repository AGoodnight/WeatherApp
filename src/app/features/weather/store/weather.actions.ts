import { createAction, props } from "@ngrx/store";
import { WEATHER_ACTIONS } from "../constants/weather.constants";

export const SetMyLocation = createAction(
    WEATHER_ACTIONS.SET_MY_LOCATION,
    props<GeoCoordinates>()
);

export const SetMyUnit = createAction(
    WEATHER_ACTIONS.UNIT,
    (unit:TemperatureUnit) => ({unit})
);

export const ToggleMyUnit = createAction(
    WEATHER_ACTIONS.TOGGLE_UNIT,
)