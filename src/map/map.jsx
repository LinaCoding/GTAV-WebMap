import { LayersControl, MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";
import React from "react";

function Map() {
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
        <Marker position={[-200, 0]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
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
