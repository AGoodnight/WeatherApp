import { createAction, props } from "@ngrx/store";
import { WEATHER_ACTIONS } from "../constants/weather.constants";

export const SetMyZip = createAction(
    WEATHER_ACTIONS.SET_MY_ZIP,
    (zip:string) => ({zip})
);

export const SetMyUnit = createAction(
    WEATHER_ACTIONS.UNIT,
    (unit:TemperatureUnit) => ({unit})
);

export const ToggleMyUnit = createAction(
    WEATHER_ACTIONS.TOGGLE_UNIT,
)