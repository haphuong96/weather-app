// import logo from './logo.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Dust from "./icons/Dust.png";

function App() {
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2">
        <div className="flex gap-2 items-center border border-solid">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Search location..."
            name="location"
            className="w-full"
          />
        </div>
        <div className="p-16 flex justify-between">
          <div>
            <div className="font-bold text-3xl">London</div>
            <div>Sunday, 19 November 09:45</div>
          </div>
          <img src={Dust} alt="dust"/>
        </div>
      </div>
      <div>weather in coming days</div>
    </div>
  );
}

export default App;
