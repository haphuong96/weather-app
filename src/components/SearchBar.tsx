import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [locationSearchKey, setLocationSearchKey] = useState<string>("");

  const onLocationInputChange = (input: string) => {
    clearTimeout(timer);
    if (input.length > 0) {
      setTimer(
        setTimeout(() => {
          console.log(`searching...${input}`);
          // loadLocations();
        }, 3000)
      );
    }
  };

  return (
    <div className="flex gap-2 items-center border border-solid">
      <FontAwesomeIcon icon={faSearch} />
      <input
        type="text"
        placeholder="Search location..."
        name="location"
        className="w-full"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onLocationInputChange(e.target.value)
        }
      />
    </div>
  );
}
