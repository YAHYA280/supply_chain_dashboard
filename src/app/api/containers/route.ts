import { NextResponse } from "next/server";

export async function GET() {
  const containers = [
    {
      id: "CONT-123456",
      shippingCompany: "Maersk",
      status: "In Transit",
      departurePort: "Mumbai, India",
      arrivalPort: "New York, USA",
      eta: "2025-01-20T10:00:00Z",
      location: { lat: 40.7128, lon: -74.006 }, // NYC
      history: [
        { time: "2025-01-18T09:00:00Z", temperature: 6, humidity: 65 },
        { time: "2025-01-18T13:00:00Z", temperature: 5.5, humidity: 63 },
        { time: "2025-01-18T19:00:00Z", temperature: 6.2, humidity: 66 },
        { time: "2025-01-19T09:00:00Z", temperature: 7, humidity: 68 },
      ],
    },
    {
      id: "CONT-789012",
      shippingCompany: "MSC",
      status: "Delayed",
      departurePort: "Shanghai, China",
      arrivalPort: "Dubai, UAE",
      eta: "2025-01-22T15:00:00Z",
      location: { lat: 25.276987, lon: 55.296249 }, // Dubai
      history: [
        { time: "2025-01-19T09:00:00Z", temperature: 9, humidity: 72 },
        { time: "2025-01-19T13:00:00Z", temperature: 9.5, humidity: 70 },
        { time: "2025-01-20T09:00:00Z", temperature: 10, humidity: 75 },
      ],
    },
    {
      id: "CONT-345678",
      shippingCompany: "Evergreen",
      status: "Customs Hold",
      departurePort: "Kaohsiung, Taiwan",
      arrivalPort: "Los Angeles, USA",
      eta: "2025-02-01T13:00:00Z",
      location: { lat: 34.0522, lon: -118.2437 }, // Los Angeles
      history: [
        { time: "2025-01-17T09:00:00Z", temperature: 2, humidity: 60 },
        { time: "2025-01-17T13:00:00Z", temperature: 2.5, humidity: 61 },
        { time: "2025-01-18T09:00:00Z", temperature: 3, humidity: 65 },
      ],
    },
  ];

  return NextResponse.json(containers);
}
