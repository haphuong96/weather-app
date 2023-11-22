import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Location } from "../interfaces/location";
import { searchLocationByKey } from "../api/location";

// const fakeData = [
//   "Result 1",
//   "Result 2",
//   "Result 3",
//   "Result 4",
//   "Result 5",
//   // Add more fake data as needed
// ];

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
      }, 2000)
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
        <ul className="absolute w-full border border-gray rounded bg-white">
          {locationSearchResults.map((location) => (
            <li
              key={location.key}
              className="hover:bg-gray-100 cursor-pointer"
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
    // list of found locations
  );
  // const [searchTerm, setSearchTerm] = useState("");
  // const [searchResults, setSearchResults] = useState<string[]>([]);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const term = e.target.value;
  //   setSearchTerm(term);

  //   // Filter results based on the search term
  //   const filteredResults = fakeData.filter((result) =>
  //     result.toLowerCase().includes(term.toLowerCase())
  //   );

  //   setSearchResults(filteredResults);
  // };

  // return (
  //   <div className="relative mt-8">
  //     <input
  //       type="text"
  //       value={searchTerm}
  //       onChange={handleChange}
  //       placeholder="Search..."
  //       className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mb-4"
  //     />
  //     {searchResults.length > 0 && (
  //       <div className="absolute top-full left-0 bg-white border border-gray-300 shadow-md p-4 rounded-md z-10">
  //         <ul className="list-none p-0">
  //           {searchResults.map((result, index) => (
  //             <li key={index} className="mb-2">
  //               {result}
  //             </li>
  //           ))}
  //         </ul>
  //       </div>
  //     )}
  //   </div>
  // );
}
