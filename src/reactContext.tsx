import React, { ReactChildren, useState } from "react";
import { IMarker } from "./types/main";

interface IMainContextProps {
    children: ReactChildren
}

interface IMainContext {
    markerList: IMarker[] | undefined,
    editMarker: IMarker | undefined,
    mapContext: L.Map | undefined,
    setMarkerList: React.Dispatch<React.SetStateAction<IMarker[] | undefined>>,
    setMapContext: React.Dispatch<React.SetStateAction<L.Map | undefined>>,
    setEditMarker: React.Dispatch<React.SetStateAction<IMarker | undefined>>
}


export const MainContext = React.createContext<IMainContext>({
    markerList: [],
    editMarker: undefined,
    mapContext: undefined,
    setMarkerList: function(x) { return },
    setMapContext: function(x) { return },
    setEditMarker: function(x) { return }
});

const ContextState = (props : IMainContextProps) => {
    const [edit, setEdit] = useState<IMarker|undefined>(undefined);
    const [marker, setMarker] = useState<IMarker[]|undefined>([]);
    const [mapContext, setContext] = useState<L.Map|undefined>(undefined);

    const setMarkerList = (markers : IMarker[] | undefined) => {
        console.log(markers);
        setMarker(markers);
    }
    setMarkerList.bind(this);

    const setMapContext = (context : L.Map | undefined) => {
        setContext(context);
    }
    setMapContext.bind(this);

    const setEditMarker = (marker : IMarker | undefined) => {
        setEdit(marker);
    }
    setEditMarker.bind(this);

    return (
        <MainContext.Provider value={{
            markerList: marker,
            setMarkerList: setMarker,
            mapContext: mapContext,
            setMapContext: setContext,
            editMarker: edit,
            setEditMarker: setEdit
        }}>
            {props.children}
        </MainContext.Provider>
    )
    
}

export default ContextState;