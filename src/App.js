import './App.css';
import React from "react";
import Map from "./map/map";
import MainMenu from "./menu/mainMenu";

function App() {
  return (
    <div className="flex">
      <div className="flex-none w-20 items-center border-r border-gray-300">
        <MainMenu></MainMenu>
      </div>
      <div className="flex-grow">
        <Map></Map>
      </div>

    </div>
  );
}

export default App;
