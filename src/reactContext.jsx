import React, { useState } from "react";

export const MainContext = React.createContext({
    markerList: [],
    editMarker: undefined,
    mapContext: undefined,
    editMarker: undefined,
    setMarkerList: function(x) { return },
    pushMarker: function(x) { return },
    setMapContext: function(x) { return },
    setEditMarker: function(x) { return}
});

const ContextState = (props) => {
    const [edit, setEdit] = useState(undefined);
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

    const setEditMarker = (marker) => {
        setEdit(marker);
    }
    setEditMarker.bind(this);

    return (
        <MainContext.Provider value={{
            markerList: marker,
            setMarkerList: setMarkerList,
            mapContext: mapContext,
            setMapContext: setMapContext,
            editMarker: edit,
            setEditMarker: setEditMarker
        }}>
            {props.children}
        </MainContext.Provider>
    )
    
}

export default ContextState;