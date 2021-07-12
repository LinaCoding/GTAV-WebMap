import React, { useState } from "react";
import markers from "./markers.json";
import icons from "./blips.json";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MarkerMenuCreate = () => {
    const [selected, setSelected] = useState({ marker: "", icon: 0 })

    return (
        <div className="px-2">
            <h2 className="text-4xl font-normal leading-normal mt-0 mb-2 text-blueGray-800">
                Create Markers
            </h2>
            <div className="border border-gray-300 rounded">
                <div className="flex items-center justify-between" id="Marker_Header">
                    <h2 className="font-bold font-normal leading-normal text-blueGray-800 p-2">Markers</h2>
                    <div className="flex p-2">
                        <div className="p-1 text-sm border rounded-l text-gray-700 bg-gray-200">
                            <FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>
                        </div>
                        <input className="border rounded-r px-1 w-32" placeholder="Search..." />
                    </div>
                </div>
                <hr/>
                <div id="Marker_Body" className="flex flex-wrap max-h-80 overflow-y-scroll p-2 justify-between">
                    {
                        markers.map(marker => (
                            <button 
                                key={marker.name} 
                                className={"hover:bg-gray-100 text-gray-700 py-2 px-4 items-center rounded " + (selected.marker === marker.name ? "bg-gray-300" : "")}
                                onClick={() => {console.log(selected); setSelected({...selected, marker: marker.name})}}
                            >
                                <img src={`${marker.path}`} className="w-12 h-15"></img>
                            </button>
                        ))
                    }
                </div>
            </div>

            <div className="border border-gray-300 rounded mt-8">
                <div className="flex items-center justify-between" id="Icon_Header">
                    <h2 className="font-bold font-normal leading-normal text-blueGray-800 p-2">Icons</h2>
                    <div className="flex p-2">
                        <div className="p-1 text-sm border rounded-l text-gray-700 bg-gray-200">
                            <FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>
                        </div>
                        <input className="border rounded-r px-1 w-32" placeholder="Search..." />
                    </div>
                </div>
                <hr/>
                <div id="Icon_Body" className="flex flex-wrap max-h-80 overflow-y-scroll p-2 justify-between">
                    {
                        icons.map(icon => (
                            <button 
                                key={icon.id} 
                                className={"hover:bg-gray-100 text-gray-700 py-2 px-4 items-center rounded " + (selected.icon === icon.id ? "bg-gray-300" : "")}
                                onClick={() => {console.log(selected); setSelected({...selected, icon: icon.id})}}
                            >
                                <img src={`${icon.path}`} className="w-8 h-8"></img>
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MarkerMenuCreate;