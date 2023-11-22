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
