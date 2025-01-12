"use client";

import { useEffect, useState } from "react";
import { fetchSensorData, OnChainSensorData } from "@/utils/blockchain";
import Dashboard from "@/components/Dashboard";
import { ContainerData } from "@/types/container";
import {
  Box,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";

const singleContainer: ContainerData = {
  id: "CONT-123456",
  shippingCompany: "Maersk",
  status: "In Transit",
  departurePort: "Mumbai, India",
  arrivalPort: "New York, USA",
  eta: "2025-01-20T10:00:00Z",
  location: { lat: 40.7128, lon: -74.006 },
  history: [],
};

export default function DashboardPage() {
  const [container, setContainer] = useState<ContainerData>(singleContainer);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSensorData() {
      try {
        const sensorEntries: OnChainSensorData[] = await fetchSensorData();
        const updatedHistory = sensorEntries.map((entry) => ({
          time: entry.timestamp.toLocaleString(),
          temperature: entry.temperatureC,
          humidity: entry.humidity,
        }));
        setContainer((prev) => ({
          ...prev,
          history: updatedHistory,
        }));
      } catch (err) {
        console.error(err);
        setError("Failed to fetch sensor data from the blockchain.");
      } finally {
        setLoading(false);
      }
    }
    loadSensorData();
  }, []);

  if (loading) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="grey.100"
      >
        <Card>
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            <CircularProgress sx={{ mb: 2 }} />
            <Typography>Loading container data from blockchain...</Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="grey.100"
      >
        <Card>
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            <Typography color="error" variant="h6" sx={{ mb: 2 }}>
              {error}
            </Typography>
            <Button variant="outlined" onClick={() => location.reload()}>
              Retry
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  // Success
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Single Container Dashboard
      </Typography>
      {/* Dashboard expects an array of containers, pass [container] */}
      <Dashboard containers={[container]} />
    </Box>
  );
}
