"use client";

import Map from "@/components/Map";

export default function Dashboard() {
  const location = {
    lat: 40.7128, // New York example
    lon: -74.006,
  };

  return (
    <div>
      <h1>Supply Chain Dashboard</h1>
      <Map location={location} />
      {/* You can add charts and additional UI elements here */}
    </div>
  );
}
