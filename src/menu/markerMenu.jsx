import { faChevronLeft, faPenSquare, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import MarkerMenuCreate from "./markerMenuCreate";
import MarkerMenuEdit from "./markerMenuEdit";

const MarkerMenu = ({setMenu, menu}) => {
    return (
        <React.Fragment>
            <div className="container bg-gray-200 border-b border-gray-400">
                <button className="bg-transparent mt-2 mb-2 text-gray-700 font-semibold hover:text-gray-800 py-2 px-4 border rounded" onClick={() => setMenu("main")}>
                    <FontAwesomeIcon className="mr-2" icon={faChevronLeft}></FontAwesomeIcon>
                    Back to Overview
                </button>
            </div>
            <div className="flex">
                <button 
                    className={"flex-grow hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border-r border-b hover:border-transparent " 
                        + (menu === "marker-create" ? "bg-blue-500 text-white border-transparent" : "text-blue-700 border-blue-500")}
                    onClick={() => setMenu("marker-create")}
                >
                    <FontAwesomeIcon className="mr-1" icon={faPlusSquare}></FontAwesomeIcon>
                    Create
                </button>
                <button 
                    className={"flex-grow hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border-b hover:border-transparent " 
                        + (menu?.match("marker-edit") ? "bg-blue-500 text-white border-transparent" : "text-blue-700 border-blue-500")}                    
                    onClick={() => setMenu("marker-edit-move")}
                >
                    <FontAwesomeIcon className="mr-1" icon={faPenSquare}></FontAwesomeIcon>
                    Edit
                </button>
            </div>

            {
                menu === "marker-create" && (
                    <MarkerMenuCreate></MarkerMenuCreate>
                )
            }
            {
                menu?.match("marker-edit") && (
                    <MarkerMenuEdit setMenu={setMenu} menu={menu}></MarkerMenuEdit>
                )
            }

        </React.Fragment>
    )
}

export default MarkerMenu;