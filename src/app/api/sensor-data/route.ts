import { NextResponse } from "next/server";

export async function GET() {
  const sensorData = {
    temperature: 25.3,
    humidity: 60,
    gps: { lat: 40.7128, lon: -74.006 },
  };
  return NextResponse.json(sensorData);
}
// this is a test
