"use client";

import dynamic from "next/dynamic";
import { Paper } from "@mui/material";

// Dynamically import the client-only Leaflet map
const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false, // crucial
});

interface MapProps {
  lat: number;
  lon: number;
  route?: [number, number][]; // Optional route array
}

export default function Map({ lat, lon, route = [] }: MapProps) {
  return (
    <Paper sx={{ height: 300, overflow: "hidden" }}>
      <MapClient
        lat={lat}
        lon={lon}
        route={route}
        style={{ height: "100%", width: "100%" }}
      />
    </Paper>
  );
}
