import './App.css';
import React, { useState } from "react";
import Map from "./map/map";
import MainMenu from "./menu/mainMenu";
import MarkerMenu from "./menu/markerMenu";

function App() {
  const [menu, setMenu] = useState("marker-create");

  return (
    <div className="flex">
      {
        menu === "main" && (
          <div className="flex-none w-20 items-center border-r border-gray-300">
            <MainMenu setMenu={setMenu}></MainMenu>
          </div>
        )
      }
      {
        menu.match(/(?:^marker$|^marker-(?:create|edit|remove)$)/) && (
          <div className="flex-none w-80 border-r border-gray-300">
            <MarkerMenu setMenu={setMenu} menu={menu}></MarkerMenu>
          </div>
        )
      }
      
      <div className="flex-grow">
        <Map></Map>
      </div>

    </div>
  );
}

export default App;
