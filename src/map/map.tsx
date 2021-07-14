import { LayersControl, MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";
import React, { useContext, useEffect, useState } from "react";
import mergeImages from "merge-images";
import { MainContext } from "../reactContext";
import { IDataRow, IMarker, IPosition } from "../types/main";

function Map({menu} : { menu: string}) {
    const [map, setMap] = useState<L.Map>()
    const context = useContext(MainContext);

    useEffect(() => {
        createMarker(1, { x: -128, y: 128}, "marker_red", "radar_safehouse", [{ id: 0, name: "id", type: "String", value:"Test"}]);
        createMarker(2, { x: -100, y: 100 }, "marker_green", "radar_safehouse", []);
    }, []);

    useEffect(() => {
        context.setMapContext(map);
    }, [map]);

    const merge = async (marker : string, icon : string) => {
      return mergeImages([
        { src: `/marker/${marker}.png`, x: 0, y: 0}, 
        { src: `/marker/${icon}.png`, x: 13, y: 14}]);
    }

    const createIcon = (image : string) => {
        return L.icon({
            iconUrl: image,
            shadowUrl: "marker/shadow.png",
            shadowAnchor: [10,40],
            shadowSize: [30,40],
            iconSize: [30,40],
            iconAnchor: [15,40],
            popupAnchor: [0,-40]
        });
    }

    const removeMarker = (marker : IMarker) => {
        if(menu === "marker-edit-remove") {
            context.setMarkerList(context.markerList?.filter(x => x.id !== marker.id));
        }
    }

    const createMarker = (id : number, position : IPosition, marker : string, icon : string, data : IDataRow[]) => {
        merge(marker, icon).then((image) => {
            context.setMarkerList([...context.markerList, { id, position, image, data: data }]);
        });
    }

    const moveMarker = (event :L.LeafletEvent, marker: IMarker) => {
        let newMarker = marker;
        newMarker.position = { x: event.target._latlng.lat, y: event.target._latlng.lng };
        if(context.markerList) {
            context.setMarkerList([...context.markerList?.filter(x => x !== marker), newMarker]);
        } else {
            context.setMarkerList([newMarker]);
        }
    }

    const MapEvents = () => {
        useMapEvents({
            zoom(e) {
                console.log(e.target._zoom);
            }
        });

        return (<React.Fragment></React.Fragment>)
    }

    return (
        <MapContainer
            center={[-128,128]}
            minZoom={2}
            zoom={2}
            maxZoom={5}
            scrollWheelZoom={true}
            maxBounds={[[0,0],[-256,256]]}
            crs={ L.CRS.Simple }
            whenCreated={setMap}
        >
            <MapEvents></MapEvents>
            {
                context.markerList?.map(marker => {
                    return (
                        <Marker 
                            key={marker.id}
                            icon={createIcon(marker.image)}
                            position={[marker.position.x, marker.position.y]}
                            draggable={ menu === "marker-edit-move" }
                            eventHandlers={{
                                click: (e) => { removeMarker(marker); },
                                moveend: (e) => { moveMarker(e, marker); }
                            }}
                        >
                            <Popup>
                                <table>
                                    <thead>
                                        <tr>
                                            <td className="px-2 w-1/2 border border-emerald-800 font-bold">Name</td>
                                            <td className="px-2 w-1/2 border border-emerald-800 font-bold">Value</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {marker.data.map(x => {
                                            return (
                                                <tr>
                                                    <td className="w-1/2 border border-emerald-800 text-center">{x.name}</td> 
                                                    <td className="w-1/2 border border-emerald-800 text-center">{x.value}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </Popup>
                        </Marker>
                    )
                })
            }

            <LayersControl position="topright">
            <LayersControl.BaseLayer name="Layer">
                <LayersControl.BaseLayer checked name="Satellite">
                <TileLayer
                    url="http://127.0.0.1:3000/satellite/{z}/{x}/{y}.png"
                    noWrap={true}
                    tms={false}
                    tileSize={256}                
                />
                </LayersControl.BaseLayer>
            </LayersControl.BaseLayer>
            </LayersControl>
        </MapContainer>
    );
}

export default Map;
