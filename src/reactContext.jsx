import React, { useState } from "react";

export const MainContext = React.createContext({
    markerList: [],
    mapContext: undefined,
    setMarkerList: function(x) { return },
    pushMarker: function(x) { return },
    setMapContext: function(x) { return },
});

const ContextState = (props) => {
    const [marker, setMarker] = useState([]);
    const [mapContext, setContext] = useState(undefined);

    const setMarkerList = (markers) => {
        console.log(markers);
        setMarker(markers);
    }
    setMarkerList.bind(this);

    const setMapContext = (context) => {
        setContext(context);
    }
    setMapContext.bind(this);

    return (
        <MainContext.Provider value={{
            markerList: marker,
            setMarkerList: setMarkerList,
            mapContext: mapContext,
            setMapContext: setMapContext
        }}>
            {props.children}
        </MainContext.Provider>
    )
    
}

export default ContextState;