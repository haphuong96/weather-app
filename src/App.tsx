import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import { Location } from "./interfaces/location";
import {
  searchDailyForecastWeatherByLocationKey,
  searchHourlyForecastWeatherByLocationKey,
  searchWeatherByLocationKey,
} from "./api/weather";
import {
  DailyForecastWeather,
  HourlyForecastWeather,
  Weather,
} from "./interfaces/weather";
import WeatherIcon from "./components/WeatherIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faTemperatureHalf,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";
import { datetimeFormatter } from "./utils/datetime-format";

function App() {
  const [location, setLocation] = useState<Location>({
    key: "",
    cityName: "",
    administrativeAreaName: "",
    countryId: "",
  });

  const [weather, setWeather] = useState<Weather>();
  const [hourlyForecasts, setHourlyForecasts] = useState<
    HourlyForecastWeather[]
  >([]);
  const [dailyForecasts, setDailyForecasts] = useState<DailyForecastWeather[]>(
    []
  );

  const searchWeatherByLocation = async (location: Location) => {
    setLocation(location);

    // search weather by location
    setWeather(await searchWeatherByLocationKey(location.key));

    //search weather forecast by location
    setHourlyForecasts(
      (await searchHourlyForecastWeatherByLocationKey(location.key)).slice(0, 5)
    );

    //search daily weather forecast by location
    setDailyForecasts(
      await searchDailyForecastWeatherByLocationKey(location.key)
    );
  };

  return (
    <div
      className={`h-screen overflow-auto bg-gradient-to-r p-5 ${
        weather?.isDayTime
          ? "from-blue-50 to-yellow-50"
          : // "from-sky-200 to-blue-300"
            "from-cyan-800 to-blue-800 text-slate-200"
      }`}
    >
      <div className="grid grid-cols-3 mb-2">
        <div className="col-span-3 md:col-span-2">
          <SearchBar location={location} onSearch={searchWeatherByLocation} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-3 md:col-span-2 flex flex-col justify-between">
          {weather && (
            <div className="pb-16">
              <div className="p-16 flex flex-col sm:flex-row justify-between">
                <div className="contents sm:display-block sm:flex sm:flex-col sm:justify-between">
                  <div className="flex flex-col items-center sm:flex-none sm:items-start">
                    <div className="font-bold text-3xl">
                      {location.cityName}
                    </div>
                    <div>
                      {datetimeFormatter(
                        weather.localObservationDateTime,
                        "EEEE, dd MMMM HH:mm"
                      )}
                    </div>
                  </div>
                  <div className="order-last sm:order-none flex flex-col items-center sm:items-start">
                    <div className="text-2xl">{weather.temperature}</div>
                    <div>{weather.weatherText}</div>
                  </div>
                </div>
                <div>
                  <WeatherIcon
                    weatherText={weather.weatherText}
                    weatherIcon={weather.weatherIcon}
                    isDayTime={weather.isDayTime}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 justify-items-stretch xs:grid-cols-4 gap-y-8 sm:pl-16">
                <div className="justify-self-center xs:justify-self-start flex">
                  <div>
                    <FontAwesomeIcon icon={faTemperatureHalf} />
                  </div>
                  <div className="pl-2">
                    <div>Feels Like</div>
                    <div className="text-xl">
                      {weather?.realFeelTemperature}
                    </div>
                  </div>
                </div>
                <div className="justify-self-center xs:justify-self-start flex">
                  <div>
                    <FontAwesomeIcon icon={faDroplet} />
                  </div>
                  <div className="pl-2">
                    <div>Humidity</div>
                    <div className="text-xl">{weather?.relativeHumidity} %</div>
                  </div>
                </div>
                <div className="justify-self-center xs:justify-self-start flex">
                  <div>
                    <FontAwesomeIcon icon={faSun} />
                  </div>
                  <div className="pl-2">
                    <div>UV Index</div>
                    <div className="text-xl">{weather?.UVIndex}</div>
                  </div>
                </div>
                <div className="justify-self-center xs:justify-self-start flex">
                  <div>
                    <FontAwesomeIcon icon={faWind} />
                  </div>
                  <div className="pl-2">
                    <div>Wind</div>
                    <div className="text-xl">{weather?.windSpeed}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {hourlyForecasts.length > 0 && (
            <div>
              <div className="pb-4 font-bold">Hourly Forecast</div>
              <div className="grid grid-cols-5 border rounded-md p-4">
                {hourlyForecasts.map((hourlyForecasts) => (
                  <div className="flex flex-col justify-between items-center text-center">
                    {/* <div>{hourlyForecasts.weatherText}</div> */}
                    <div>
                      {datetimeFormatter(
                        hourlyForecasts.localDateTime,
                        "HH:mm"
                      )}
                    </div>
                    <WeatherIcon
                      weatherText={hourlyForecasts.weatherText}
                      weatherIcon={hourlyForecasts.weatherIcon}
                      isDayTime={hourlyForecasts.isDayTime}
                      style={{ height: 100 }}
                    />
                    <div className="weather-text-responsive">
                      {hourlyForecasts.weatherText}
                    </div>
                    <div>{hourlyForecasts.temperature}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {dailyForecasts.length > 0 && (
          <div className="flex flex-col col-span-3 md:col-span-1">
            <div className="pb-4 font-bold">Daily Forecast</div>

            <div className="flex-grow grid grid-rows-5 border rounded-md p-4">
              {dailyForecasts.map((dailyForecast) => (
                <div className="grid grid-cols-3 gap-8 items-center pb-2">
                  {/* <div>{dailyForecast.weatherText}</div> */}
                  <div>
                    {datetimeFormatter(dailyForecast.localDateTime, "EEEE")}
                  </div>
                  <div>
                    <WeatherIcon
                      weatherText={dailyForecast.weatherText}
                      weatherIcon={dailyForecast.weatherIcon}
                      isDayTime={true}
                      style={{ height: 100 }}
                    />
                    <div className="text-center weather-text-responsive">
                      {dailyForecast.weatherText}
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-between">
                    <div className="mx-1">
                      {dailyForecast.temperatureMaximum}
                    </div>
                    <div className="mx-1 font-light">
                      {dailyForecast.temperatureMinimum}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
