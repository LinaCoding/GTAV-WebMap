import './App.css';
import './tailwind.output.css';
import React, { useContext, useState } from "react";
import Map from "./map/map";
import MainMenu from "./menu/mainMenu";
import MarkerMenu from "./menu/markerMenu";
import DataEditor from './menu/dataEditor';
import { MainContext } from './reactContext';

function App() {
  const [menu, setMenu] = useState("marker-create");
  const context = useContext(MainContext);

  const updateMenu = (newMenu : string) => {
    if(menu === "marker-edit-editor" && newMenu !== "marker-edit-editor") {
      context.setEditMarker(undefined);
    }

    setMenu(newMenu);
  }

  return (
    <div className="flex h-screen max-h-screen">
      {
        menu === "main" && (
          <div className="flex-none w-20 items-center border-r border-gray-300">
            <MainMenu menu={menu} setMenu={updateMenu}></MainMenu> 
          </div>
        )
      }
      {
        menu.match(/(?:^marker$|^marker-(?:create|edit|remove))/) && (
          <div className="flex-none w-80 border-r border-gray-300">
            <MarkerMenu setMenu={updateMenu} menu={menu}></MarkerMenu>
          </div>
        )
      }
      
      <div className="flex-grow">
        <div className="grid grid-rows-4 h-full">
            <div className={"w-full " + (menu === "marker-edit-editor" && context.editMarker ? "row-span-3" : "row-span-4")}>
              <Map menu={menu}></Map>
            </div>
          {
          menu === "marker-edit-editor" && context.editMarker && (
            <div className="w-full row-span-1 p-2 border-t border-gray-300">
              <DataEditor></DataEditor>
            </div>
          )
        }
        </div>
      </div>
    </div>
  );
}

export default App;
