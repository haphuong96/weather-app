import axios from "axios";
import { Weather } from "../interfaces/weather";
import weatherApi from "./api-call.json";

export const searchWeatherByLocationKey = async (
  locationKey: string
): Promise<Weather | undefined> => {
  if (!locationKey) return;

  const response = (
    await axios.get(
      `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`,
      {
        params: {
          apikey: process.env.REACT_APP_API_KEY,
          details: true,
        },
      }
    )
  ).data;

  // const response = weatherApi;

  return response.map((weather: any) => ({
    localObservationDateTime: weather.LocalObservationDateTime,
    weatherText: weather.WeatherText,
    weatherIcon: weather.WeatherIcon,
    hasPrecipitation: weather.HasPrecipitation,
    precipitationType: weather.PrecipitationType,
    isDayTime: weather.IsDayTime,
    temperature:
      weather.Temperature.Metric.Value + "° " + weather.Temperature.Metric.Unit, //degree celsius
    realFeelTemperature:
      weather.RealFeelTemperature.Metric.Value +
      "° " +
      weather.RealFeelTemperature.Metric.Unit, //degree celsius
    windSpeed:
      weather.Wind.Speed.Metric.Value + " " + weather.Wind.Speed.Metric.Unit, //km/h
    relativeHumidity: weather.RelativeHumidity, //percentage
    UVIndex: weather.UVIndex,
    UVIndexText: weather.UVIndexText,
  }))[0];
};
