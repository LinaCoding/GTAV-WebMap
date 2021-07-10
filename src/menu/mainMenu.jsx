import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faMap, faCode, faPen, faCog } from '@fortawesome/free-solid-svg-icons'

const LeftMenu = () => {
    return ( 
        <div>
            <button class="hover:bg-gray-100 text-gray-700 py-2 px-4 items-center">
                <FontAwesomeIcon className="font-bold" icon={faMap} />
                <span>Navi</span>
            </button>
            <hr className="ml-2 mr-2" />
            <button class="hover:bg-gray-100 text-gray-700 py-2 px-4 items-center">
                <FontAwesomeIcon className="font-bold" icon={faMapMarkerAlt} />
                <span>Marker</span>
            </button>  
            <hr className="ml-2 mr-2" />   
            <button class="hover:bg-gray-100 text-gray-700 py-2 px-4 items-center">
                <FontAwesomeIcon className="font-bold" icon={faPen} />
                <span>Draw</span>
            </button>  
            <hr className="ml-2 mr-2" />   
            <button class="hover:bg-gray-100 text-gray-700 py-2 px-4 items-center">
                <FontAwesomeIcon className="font-bold" icon={faCog} />
                <span>Config</span>
            </button>  
            <hr className="ml-2 mr-2" />   
            <button class="hover:bg-gray-100 text-gray-700 py-2 px-4 items-center">
                <FontAwesomeIcon className="font-bold" icon={faCode} />
                <span>Export</span>
            </button>         
        </div>
    )
}

export default LeftMenu;