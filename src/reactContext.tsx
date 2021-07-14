import React, { ReactChildren, useState } from "react";
import { IMarker } from "./types/main";

interface IMainContextProps {
    children: ReactChildren
}

interface IMainContext {
    markerList: IMarker[],
    editMarker: IMarker | undefined,
    mapContext: L.Map | undefined,
    setMarkerList: (x: IMarker[]) => void
    setMapContext: (x: L.Map | undefined) => void
    setEditMarker: (x: IMarker | undefined) => void
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
    const [marker, setMarker] = useState<IMarker[]>([]);
    const [mapContext, setContext] = useState<L.Map|undefined>(undefined);

    const setMarkerList = (markers : IMarker[]) => {
        setMarker(markers);
    }
    setMarkerList.bind(this);

    const setMapContext = (context : L.Map | undefined) => {
        setContext(context);
    }
    setMapContext.bind(this);

    const setEditMarker = (newMarker : IMarker | undefined) => {
        setEdit(newMarker);
        
        if(newMarker) {
            setMarkerList(marker?.map(x => {
                if(x.id === newMarker.id) {
                    return newMarker
                }
                return x;
            }))
        }

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