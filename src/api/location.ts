import axios from "axios";
import { Location } from "../interfaces/location";

export const searchLocationByKey = async (
  locationSearchKey: string
): Promise<Location[]> => {
  // If the locationSearchKey is empty, return an empty array
  if (!locationSearchKey) {
    return [];
  }

  const response = (
    await axios.get(
      `http://dataservice.accuweather.com/locations/v1/cities/search`,
      {
        params: {
          q: locationSearchKey,
          apikey: process.env.REACT_APP_API_KEY,
        },
      }
    )
  ).data;
  console.log(response);

  return response.map((location: any) => ({
    key: location.Key,
    cityName: location.LocalizedName,
    administrativeAreaName: location.AdministrativeArea.LocalizedName,
    countryId: location.Country.ID,
  }));
};
