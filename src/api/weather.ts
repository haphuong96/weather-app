import axios from "axios";
import { Weather } from "../interfaces/weather";


export const searchWeatherByLocation = async (
  locationKey: string
): Promise<Weather[]> => {

  const response = (
    await axios.get(
      `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`,
      {
        params: {
          apikey: process.env.REACT_APP_API_KEY,
        },
      }
    )
  ).data;
  console.log(response);

  return [];
//   return response.map((location: any) => ({
//     key: location.Key,
//     cityName: location.LocalizedName,
//     administrativeAreaName: location.AdministrativeArea.LocalizedName,
//     countryId: location.Country.ID,
//   }));
};
