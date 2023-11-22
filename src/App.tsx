import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import { Location } from "./interfaces/location";
import { searchWeatherByLocationKey } from "./api/weather";
import { Weather } from "./interfaces/weather";
import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import WeatherIcon from "./components/WeatherIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faTemperatureHalf,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";
/**
 * Return date in format 'EEEE, dd MMMM HH:mm'. For i.e: Monday, 22 November 03:17
 * @param date time in format yyyy-mm-ddThh:mm:ss[+/-hh:mm].For i.e: 2023-11-22T03:17:00+09:00
 */
const dateFormatter = (date: string): string => {
  const timezone = date.substring(date.length - 6, date.length);
  const parsedDate = new Date(date);
  return formatInTimeZone(parsedDate, timezone, "EEEE, dd MMMM HH:mm");
};

function App() {
  const [location, setLocation] = useState<Location>({
    key: "",
    cityName: "",
    administrativeAreaName: "",
    countryId: "",
  });

  const [weather, setWeather] = useState<Weather>();

  const searchWeatherByLocation = async (location: Location) => {
    console.log("location " + location);
    setLocation(location);

    // search weather by location
    setWeather(await searchWeatherByLocationKey(location.key));
  };

  return (
    <div
      className={`fixed w-full h-full bg-gradient-to-r ${
        !weather?.isDayTime
          ? "from-cyan-800 to-blue-800"
          : "from-blue-50 to-yellow-50"
      }`}
    >
      <div className="grid gap-4 grid-cols-3 p-5">
        <div className="col-span-2">
          <SearchBar location={location} onSearch={searchWeatherByLocation} />
          {weather && (
            <div>
              <div className="p-16 flex justify-between">
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="font-bold text-3xl">
                      {location.cityName}
                    </div>
                    <div>{dateFormatter(weather.localObservationDateTime)}</div>
                  </div>
                  <div>
                    <div className="text-2xl">{weather.temperature}</div>
                    <div>{weather.weatherText}</div>
                  </div>
                </div>
                <WeatherIcon
                  weatherText={weather.weatherText}
                  isDayTime={weather.isDayTime}
                />
                {/* <img src={Dust} alt="dust"/> */}
              </div>
              <div className="grid grid-cols-2 gap-y-10 px-16">
                <div className="flex">
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
                <div className="flex">
                  <div>
                    <FontAwesomeIcon icon={faDroplet} />
                  </div>
                  <div className="pl-2">
                    <div>Humidity</div>
                    <div className="text-xl">{weather?.relativeHumidity} %</div>
                  </div>
                </div>
                <div className="flex">
                  <div>
                    <FontAwesomeIcon icon={faSun} />
                  </div>
                  <div className="pl-2">
                    <div>UV Index</div>
                    <div className="text-xl">{weather?.UVIndex}</div>
                  </div>
                </div>
                <div className="flex">
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
        </div>
        <div>
          {/* 5-day forecast */}
          </div>
      </div>
    </div>
  );
}

export default App;
