export interface Weather {
    localObservationDateTime: string;
    weatherText: string;
    weatherIcon: number;
    hasPrecipitation: boolean;
    precipitationType: string;
    isDayTime: boolean;
    temperature: string; //degree celsius
    realFeelTemperature: string; //degree celsius
    windSpeed: string; //km/h
    relativeHumidity: number; //percentage
    UVIndex: number;
    UVIndexText: string;
}

export interface HourlyForecastWeather {
    localDateTime: string;
    weatherIcon: number;
    temperature: string; //degree celsius
    humidity: number; //percentage
    isDayTime: boolean;
    weatherText: string;
}

export interface DailyForecastWeather {
    localDateTime: string;
    weatherIcon: number;
    weatherText: string;
    temperatureMinimum: string; //degree celsius
    temperatureMaximum: string; //degree celsius
}