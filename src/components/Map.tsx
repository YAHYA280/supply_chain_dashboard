"use client";

import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Paper } from "@mui/material";
import L from "leaflet";

// Create a custom icon pointing to our container image in /public

const containerIcon = L.icon({
  iconUrl: "/CotainerPos.png", // Must match exact filename in /public
  iconSize: [32, 32], // Adjust to match your image dimensions
  iconAnchor: [16, 32], // Position the "tip" of the icon if needed
  popupAnchor: [0, -32], // Where the popup should appear relative to icon
});

// Dynamically load React Leaflet (no SSR)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false,
  }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  {
    ssr: false,
  }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  {
    ssr: false,
  }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

interface MapProps {
  lat: number;
  lon: number;
}

export default function Map({ lat, lon }: MapProps) {
  const center: LatLngExpression = [lat, lon];

  return (
    <Paper sx={{ height: 300, overflow: "hidden" }}>
      <MapContainer
        center={center}
        zoom={4}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={center} icon={containerIcon}>
          <Popup>Container Location</Popup>
        </Marker>
      </MapContainer>
    </Paper>
  );
}
