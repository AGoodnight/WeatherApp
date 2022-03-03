export const WEATHER_PATHS: RoutesDictionary = {
  FORECAST: 'weather/forecast',
  DATE: 'weather/date',
  CURRENT: 'weather/current',
};

export const WEATHER_ACTIONS: ActionsDictionary = {
  SET_MY_ZIP: 'SET_MY_ZIP',
  SET_MY_UNIT: 'SET_MY_UNIT',
  TOGGLE_UNIT: 'TOGGLE_UNIT',
};

export const WEATHER_TEMPRATURE_UNITS: Record<string, TemperatureUnit> = {
  IMPERIAL: 'imperial',
  METRIC: 'metric',
};

export const WEATHER_TEMPRATURE_SYMBOLS: Record<TemperatureUnit, string> = {
  imperial: '°F',
  metric: '°C',
  standard: 'blargh',
};

export const WEATHER_FEATURE_DEFAULTS: Record<string, any> = {
  DEFAULT_FORECAST_RANGE: 5,
  DEFAULT_UNITS: WEATHER_TEMPRATURE_UNITS.IMPERIAL,
};
