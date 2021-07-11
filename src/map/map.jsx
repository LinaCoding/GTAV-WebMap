import { LayersControl, MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";
import React, { useContext, useEffect } from "react";
import mergeImages from "merge-images";
import { MainContext } from "../reactContext";

function Map() {
    const context = useContext(MainContext);

    useEffect(() => {
        createMarker(1, [-128,128], "marker_red", "radar_safehouse", "test");
    }, []);

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
        })
    }

    const createMarker = (id, position, marker, icon, data) => {
        merge(marker, icon).then((image) => {
            context.setMarkerList([...context.markerList, { id, position, image, popup: data }])
            console.log(context.markerList);
        });
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
            style={{ height: "100%", width: "100%" }}
        >
            <MapEvents></MapEvents>
            {
                context.markerList.map(marker => {
                    return (
                        <Marker 
                            key={marker.position}
                            icon={createIcon(marker.image)}
                            position={marker.position}
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
