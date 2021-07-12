import { faArrowsAlt, faEraser, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { MainContext } from "../reactContext";
import { IMarker, IMenuProps } from "../types/main";

const MarkerMenuEdit = ({menu, setMenu} : IMenuProps) => {
    const context = useContext(MainContext);
    console.log(context);

    const centerMarker = (marker : IMarker) => {
        context.mapContext?.setView([marker.position.x, marker.position.y], context.mapContext.getZoom());

        if(menu === "marker-edit-editor") {
            context.setEditMarker(marker);
        }
    }

    return (
        <div className="px-2">
            <h2 className="text-4xl font-normal leading-normal mt-0 mb-2 text-blueGray-800">
                Edit Markers
            </h2>
            <div className="border rounded">
                <h3 className="font-bold font-normal leading-normal text-blueGray-800 p-2">Tools</h3>
                <hr />
                <div className="flex justify-between p-2">
                    <button 
                        className={"py-2 px-4 items-center rounded " +  (menu === "marker-edit-move" ? "bg-blue-500 text-white" : "hover:bg-gray-100 text-gray-700")}
                        onClick={() => setMenu("marker-edit-move")}
                    >
                        <div><FontAwesomeIcon className="font-bold" icon={faArrowsAlt}></FontAwesomeIcon></div>
                        <span>Move</span>
                    </button>
                    <button 
                        className={"py-2 px-4 items-center rounded " +  (menu === "marker-edit-editor" ? "bg-blue-500 text-white" : "hover:bg-gray-100 text-gray-700")}
                        onClick={() => setMenu("marker-edit-editor")}
                    >
                        <div><FontAwesomeIcon className="font-bold" icon={faMapMarkerAlt}></FontAwesomeIcon></div>
                        <span>DataEditor</span>
                    </button>
                    <button 
                        className={"py-2 px-4 items-center rounded " +  (menu === "marker-edit-remove" ? "bg-blue-500 text-white" : "hover:bg-gray-100 text-gray-700")}
                        onClick={() => setMenu("marker-edit-remove")}
                    >
                        <div><FontAwesomeIcon className="font-bold" icon={faEraser}></FontAwesomeIcon></div>
                        <span>Remove</span>
                    </button>
                </div>
            </div>

            <div className="border rounded mt-5">
                <h3 className="font-bold font-normal leading-normal text-blueGray-800 p-2">Points</h3>
                <hr />
                <div className="p-2">
                    <table className="border-collapse w-full border border-emerald-800 rounded">
                        <thead>
                            <tr>
                                <th className="w-1/3 border border-emerald-800">ID</th>
                                <th className="w-1/3 border border-emerald-800">Position</th>
                                <th className="w-1/3 border border-emerald-800">Icon</th>
                            </tr>
                        </thead>
                        <tbody className="cursor-pointer">
                            {
                                context.markerList?.map(marker => {
                                    return (
                                        <tr className="hover:bg-blue-200" onClick={() => centerMarker(marker)}>
                                            <td className="border border-emerald-800 text-center">{marker.id}</td>
                                            <td className="border border-emerald-800 text-center">[{marker?.position.x + "," + marker?.position.y}]</td>
                                            <td className="border border-emerald-800">
                                                <div className="w-full flex justify-center"><img src={marker.image} width="18" height="26"/></div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>     
            </div>
        </div>
    )
}

export default MarkerMenuEdit;