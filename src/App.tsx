import "./App.css";
import SearchBar from "./components/SearchBar";
// import Dust from "./icons/Dust.png";
import sunny from "./icons/sunny.json";
import { useLottie } from "lottie-react";

function App() {
  const options = {
    animationData: sunny,
    loop: true,
  };

  const { View: Sunny } = useLottie(options);

  const loadWeather = async () => {};

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2">
        <SearchBar />
        <div className="p-16 flex justify-between">
          <div>
            <div className="font-bold text-3xl">London</div>
            <div>Sunday, 19 November 09:45</div>
          </div>
          <>{Sunny}</>
          {/* <img src={Dust} alt="dust"/> */}
        </div>
        <div className="grid grid-cols-2">
          <div>
            <div>Feels Like</div>
            <div>22</div>
          </div>
          <div>
            <div>Humidity</div>
            <div>50%</div>
          </div>
          <div>
            <div>UV Index</div>
            <div>2</div>
          </div>
          <div>
            <div>Wind</div>
            <div>7 km/h</div>
          </div>
        </div>
      </div>
      <div>weather in coming days</div>
    </div>
  );
}

export default App;
