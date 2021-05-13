export const WEATHER_PATHS:RoutesDictionary = {
    FORECAST:'weather/forecast',
    DATE:'weather/date',
    CURRENT:'weather/current'
}

export const WEATHER_ACTIONS:ActionsDictionary = {
    SET_MY_ZIP:'SET_MY_ZIP',
    SET_MY_UNIT:'SET_MY_UNIT',
    TOGGLE_UNIT:'TOGGLE_UNIT'
}

export const WEATHER_TEMPRATURE_UNITS:Dictionary = {
    IMPERIAL:'imperial',
    METRIC:'metric'
}

export const WEATHER_TEMPRATURE_SYMBOLS:Dictionary = {
    imperial:'°F',
    metric:'°C'
}

export const WEATHER_FEATURE_DEFAULTS:Dictionary = {
    DEFAULT_FORECAST_RANGE:5,
    DEFAULT_UNITS:WEATHER_TEMPRATURE_UNITS.IMPERIAL
}