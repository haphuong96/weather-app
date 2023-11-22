import axios from "axios";
import { DailyForecastWeather, HourlyForecastWeather, Weather } from "../interfaces/weather";
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
      weather.Temperature.Metric.Value + " °" + weather.Temperature.Metric.Unit, //degree celsius
    realFeelTemperature:
      weather.RealFeelTemperature.Metric.Value +
      " °" +
      weather.RealFeelTemperature.Metric.Unit, //degree celsius
    windSpeed:
      weather.Wind.Speed.Metric.Value + " " + weather.Wind.Speed.Metric.Unit, //km/h
    relativeHumidity: weather.RelativeHumidity, //percentage
    UVIndex: weather.UVIndex,
    UVIndexText: weather.UVIndexText,
  }))[0];
};

export const searchHourlyForecastWeatherByLocationKey = async (
  locationKey: string
): Promise<HourlyForecastWeather[]> => {
  if (!locationKey) return [];

  const response = (
    await axios.get(
      `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}`,
      {
        params: {
          apikey: process.env.REACT_APP_API_KEY,
          details: true,
          metric: true,
        },
      }
    )
  ).data;

  // const response = weatherApi;

  return response.map((weather: any) => ({
    localDateTime: weather.DateTime,
    weatherIcon: weather.WeatherIcon,
    temperature: weather.Temperature.Value + " °" + weather.Temperature.Unit, //degree celsius
    humidity: weather.RelativeHumidity, //percentage
    isDayTime: weather.IsDaylight,
    weatherText: weather.IconPhrase,
  }));
};

export const searchDailyForecastWeatherByLocationKey = async (
  locationKey: string
): Promise<DailyForecastWeather[]> => {
  if (!locationKey) return [];

  const response = (
    await axios.get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`,
      {
        params: {
          apikey: process.env.REACT_APP_API_KEY,
          details: true,
          metric: true,
        },
      }
    )
  ).data;

  // const response = weatherApi;

  return response.DailyForecasts.map((weather: any) => ({
    localDateTime: weather.Date,
    weatherIcon: weather.Day.Icon,
    temperatureMaximum:
      weather.Temperature.Maximum.Value +
      " °" +
      weather.Temperature.Maximum.Unit, //degree celsius
    temperatureMinimum:
      weather.Temperature.Minimum.Value +
      " °" +
      weather.Temperature.Minimum.Unit, //degree celsius
    weatherText: weather.Day.IconPhrase,
  }));
};
