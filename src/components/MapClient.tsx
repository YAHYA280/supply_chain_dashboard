"use client";

/**
 * A purely client-side component.
 * We import "leaflet" and "react-leaflet" here,
 * ensuring it's never SSR'd.
 */
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CSSProperties, useMemo } from "react";

/**
 * This is your custom icon. We define it inside the client component
 * so 'window' is available.
 */
const containerIcon = L.icon({
  iconUrl: "/CotainerNow.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

interface MapClientProps {
  lat: number;
  lon: number;
  style?: CSSProperties;
}

export default function MapClient({ lat, lon, style }: MapClientProps) {
  const center = useMemo<[number, number]>(() => [lat, lon], [lat, lon]);

  return (
    <div style={{ height: 300, width: "100%", ...style }}>
      <MapContainer
        center={center}
        zoom={4}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={center} icon={containerIcon}>
          <Popup>
            <div style={{ textAlign: "center" }}>
              <strong>Container Location</strong>
              <p>
                Lat: {lat}, Lon: {lon}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
