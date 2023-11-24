import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Location } from "../interfaces/location";
import { searchLocationByKey } from "../api/location";

export default function SearchBar({
  location,
  onSearch,
}: {
  location: Location;
  onSearch: (location: Location) => Promise<void>;
}) {
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [locationSearchResults, setLocationSearchResults] = useState<
    Location[]
  >([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isDisplayedList, setIsDisplayedList] = useState<boolean>(false);

  const onLocationInputChange = (input: string) => {
    clearTimeout(timer);

    setTimer(
      setTimeout(async () => {
        await searchLocations(input);
      }, 1000)
    );
  };

  const searchLocations = async (locationSearchKey: string) => {
    setLocationSearchResults(await searchLocationByKey(locationSearchKey));
  };

  return (
    <div className="relative w-full">
      <div
        className={`flex gap-2 items-center border border-gray-300 rounded py-1 px-2 ${
          isFocused ? "border-blue-500" : ""
        }`}
      >
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="text"
          placeholder="Search location..."
          name="location"
          className="w-full focus-visible:outline-none bg-transparent"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onLocationInputChange(e.target.value)
          }
          onFocus={(e) => {
            setIsDisplayedList(true);
            setIsFocused(true);
          }}
          onBlur={(e) => {
            setIsFocused(false);
          }}
        />
      </div>

      {locationSearchResults.length > 0 && (isFocused || isDisplayedList) && (
        <ul className="absolute z-10 w-full border border-gray bg-slate-50 rounded text-black">
          {locationSearchResults.map((location) => (
            <li
              key={location.key}
              className="hover:bg-slate-400 cursor-pointer px-2"
              onClick={(e) => {
                setIsDisplayedList(false);
                onSearch(location);
              }}
            >
              {location.cityName}, {location.administrativeAreaName},{" "}
              {location.countryId}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
