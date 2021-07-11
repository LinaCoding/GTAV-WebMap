import { LayersControl, MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";
import React, { useContext, useEffect, useState } from "react";
import mergeImages from "merge-images";
import { MainContext } from "../reactContext";

function Map({menu}) {
    const [map,setMap] = useState()
    const context = useContext(MainContext);

    useEffect(() => {
        createMarker(1, [-128,128], "marker_red", "radar_safehouse", "test");
        createMarker(2, [-100,100], "marker_green", "radar_safehouse", "test");
    }, []);

    useEffect(() => {
        context.setMapContext(map);
    }, [map]);

    const merge = async (marker, icon) => {
      return mergeImages([
        { src: `/marker/${marker}.png`, x: 0, y: 0}, 
        { src: `/marker/${icon}.png`, x: 13, y: 14}]);
    }

    const createIcon = (image) => {
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

    const removeMarker = (marker) => {
        console.log(context.markerList);
        if(menu === "marker-edit-remove") {
            context.setMarkerList(context.markerList.filter(x => x.id !== marker.id));
        }
    }

    const createMarker = (id, position, marker, icon, data) => {
        merge(marker, icon).then((image) => {
            context.setMarkerList((prev) => { return [...prev, { id, position, image, popup: data }] });
        });
    }

    const moveMarker = (event, marker) => {
        let newMarker = marker;
        newMarker.position = [event.target._latlng.lat, event.target._latlng.lng];
        console.log(newMarker);
        context.setMarkerList([...context.markerList.filter(x => x !== marker), newMarker]);
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
        <div className="map leaflet-container" >
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
                context.markerList.map(marker => {
                    return (
                        <Marker 
                            key={marker.position}
                            icon={createIcon(marker.image)}
                            position={marker.position}
                            draggable={ menu === "marker-edit-move" }
                            eventHandlers={{
                                click: (e) => { removeMarker(marker); },
                                moveend: (e) => { moveMarker(e, marker); }
                            }}
                        >
                            <Popup>
                                {marker.popup}
                            </Popup>
                        </Marker>
                    )
                })
            }

            <LayersControl position="topright">
            <LayersControl.BaseLayer>
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
        </div>
    );
}

export default Map;
