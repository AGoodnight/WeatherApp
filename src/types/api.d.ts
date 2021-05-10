interface WeatherResponse{
    coord: GeoCoordinates,
    weather: WeatherDisplay[],
    base: string,
    main: WeatherConditons,
    visibility: number,
    wind: WindConditons,
    clouds: CloudConditions,
    dt: number,
    sys: OtherConditons,
    timezone: number,
    id: number,
    name: string,
    cod: number,
    dt_txt?:string
    pop?:number,
    rain?:RainConditions
}  


interface ForecastResponse{
    cod: number,
    message: number,
    cnt: number,
    list: WeatherResponse[],
    city: City
}

interface City{
    id:number,
    name:string,
    coord:GeoCoordinates,
    country:string,
    timezone:number,
    sunrise:number,
    sunset:number
}

interface GeoCoordinates{
    lon:number,
    lat:number
}

interface WeatherDisplay{
    id: number,
    main: string,
    description: string,
    icon: string
}

interface WeatherConditons{
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
    sea_level?: number,
    grnd_level?: number,
    temp_kf?: number
}

interface WindConditons{
    speed: number,
    deg: number,
    gust?:number
}

interface CloudConditions{
    all:number
}

interface RainConditions{
    '3h'?:number
}

interface OtherConditons{
    type?: number,
    id?: number,
    message?: number,
    country?: string,
    sunrise?: number,
    sunset?: number,
    pod?:string
}