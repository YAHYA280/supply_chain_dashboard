"use client";

/**
 * A purely client-side component.
 * We import "leaflet" and "react-leaflet" here,
 * ensuring it's never SSR'd.
 */
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
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
  // The 'main' coordinates (could be the latest container location)
  lat: number;
  lon: number;

  // Optional route array of [lat, lon] pairs for the container path
  route?: [number, number][];

  style?: CSSProperties;
}

export default function MapClient({
  lat,
  lon,
  route = [],
  style,
}: MapClientProps) {
  // We'll default the center to either the first route coordinate or [lat, lon]
  const center = useMemo<[number, number]>(() => {
    if (route.length > 0) return route[0];
    return [lat, lon];
  }, [lat, lon, route]);

  return (
    <div style={{ height: 300, width: "100%", ...style }}>
      <MapContainer
        center={center}
        zoom={4}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 
          1) If you have a route of multiple coordinates, show a Polyline.
             pathOptions lets you style the line (color, weight, etc.)
        */}
        {route.length > 1 && (
          <Polyline
            positions={route}
            pathOptions={{ color: "blue", weight: 3 }}
          />
        )}

        {/* 
          2) Markers for each coordinate in the route 
          (or if route is empty, we'll fall back to the single [lat, lon]).
        */}
        {route.length > 0 ? (
          route.map(([latitude, longitude], idx) => (
            <Marker
              key={idx}
              position={[latitude, longitude]}
              icon={containerIcon}
            >
              <Popup>
                <div style={{ textAlign: "center" }}>
                  <strong>Step {idx + 1}</strong>
                  <p>
                    Lat: {latitude}, Lon: {longitude}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))
        ) : (
          <Marker position={[lat, lon]} icon={containerIcon}>
            <Popup>
              <div style={{ textAlign: "center" }}>
                <strong>Container Location</strong>
                <p>
                  Lat: {lat}, Lon: {lon}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
