import React, { useState } from "react";

export const MainContext = React.createContext({
    markerList : []
});

const ContextState = (props) => {
    const [state, setState] = useState({
        markerList: [],
        setMarkerList: function() { return; }
    });

    const setMarkerList = (markers) => {
        setState({...state, markerList: markers});
    }
    setMarkerList.bind(this);

    return (
        <MainContext.Provider value={{
            markerList: state.markerList,
            setMarkerList: setMarkerList
        }}>
            {props.children}
        </MainContext.Provider>
    )
    
}

export default ContextState;