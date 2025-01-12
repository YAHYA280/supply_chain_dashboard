"use client";

/**
 * This file is a simple wrapper that dynamically imports MapClient
 * with SSR disabled.
 */
import dynamic from "next/dynamic";
import { Paper } from "@mui/material";

const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false, // crucial
});

interface MapProps {
  lat: number;
  lon: number;
}

export default function Map({ lat, lon }: MapProps) {
  return (
    <Paper sx={{ height: 300, overflow: "hidden" }}>
      {/* All actual Leaflet code is in MapClient */}
      <MapClient
        lat={lat}
        lon={lon}
        style={{ height: "100%", width: "100%" }}
      />
    </Paper>
  );
}
