import React from "react";
// import Dust from "./icons/Dust.png";
import sunny from "../icons/sunny.json";
import night from "../icons/night.json";
import { useLottie } from "lottie-react";

const weatherIconMapDay: { [key: string]: any } = {
  sunny: sunny,
  "mostly sunny": sunny,
  "partly sunny": sunny,
  "intermittent clouds": sunny,
  "hazy sunshine": sunny,
  "mostly cloudy": sunny,
  cloudy: sunny,
  "dreary (overcast)": sunny,
  fog: sunny,
  showers: sunny,
  "mostly cloudy w/ showers": sunny,
  "partly sunny w/ showers": sunny,
  "t-storms": sunny,
  "mostly cloudy w/ t-storms": sunny,
  "partly sunny w/ t-storms": sunny,
  rain: sunny,
  flurries: sunny,
  "mostly cloudy w/ flurries": sunny,
  "partly sunny w/ flurries": sunny,
  snow: sunny,
  "mostly cloudy w/ snow": sunny,
  ice: sunny,
  sleet: sunny,
  "freezing rain": sunny,
  "rain and snow": sunny,
  hot: sunny,
  cold: sunny,
  windy: sunny,
};

const weatherIconMapNight: { [key: string]: any } = {
  cloudy: night,
  "dreary (overcast)": night,
  fog: night,
  showers: night,
  "t-storms": night,
  rain: night,
  flurries: night,
  snow: night,
  ice: night,
  sleet: night,
  "freezing rain": night,
  "rain and snow": night,
  hot: night,
  cold: night,
  windy: night,
  clear: night,
  "mostly clear": "night",
  "partly cloudy": night,
  "intermittent clouds": night,
  "hazy moonlight": night,
  "mostly cloudy": night,
  "partly cloudy w/showers": night,
  "mostly cloudy w/ showers": night,
  "partly cloudy w/ t-storms": night,
  "mostly cloudy w/ t-storms": night,
  "mostly cloudy w/ flurries": night,
  "mostly cloudy w/ snow": night,
};
export default function WeatherIcon({
  weatherText,
  isDayTime,
}: {
  weatherText: string;
  isDayTime: boolean;
}) {
  const weatherTextKey = weatherText.toLowerCase();
  const options = {
    animationData: isDayTime
      ? weatherIconMapDay[weatherTextKey]
      : weatherIconMapNight[weatherTextKey],
  };
  const { View } = useLottie(options);
  return View;
}
