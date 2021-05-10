import { environment } from  '../../../../environments/environment';

export const WEATHER_ENDPOINTS:URLDictionary = {
    CURRENT_WEATHER:environment.currentWeatherAPIUrl+'/weather',
    HISTORICAL_WEATHER:environment.historicalWeatherAPIUrl+'/history',
    FORECAST:environment.currentWeatherAPIUrl+'/forecast',
}

export const BLOB_ENDPOINTS:URLDictionary = {
    ICON:'http://openweathermap.org/img/wn'
}

export const API_KEY:string|null = environment.apiKey || null;

export const API_ENDPOINTS:URLDictionary = Object.assign({},
    WEATHER_ENDPOINTS,
    BLOB_ENDPOINTS
);
