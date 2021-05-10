type TemperatureUnit = 'standard'|'metric'|'imperial';

interface WeatherReport extends WeatherResponse{
    units:TemperatureUnit,
    formatted_date:string,
    weekday_as_unique_index:number,
    day_name:string,
    day:string,
    month_name:string,
    month:string,
    year:string,
    hour:string,
    hour24:string,
    hour_period:string,
    icon:any,
}

interface WeatherReportDay extends ParsedDateObject{
    weather:WeatherReport[]
}

interface ForecastReport extends ForecastResponse{
    units:string,
    report:WeatherReportDay[]
}

interface WeatherReportExtras extends ParsedDateObject{
    icon:string,
    units:string
}