// File: src/components/ContainerDetails.tsx
"use client";

import { ContainerData } from "@/types/container";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Chip,
  Divider,
} from "@mui/material";
import Map from "./Map";
import Chart from "./Chart";

interface Props {
  container: ContainerData;
}

export default function ContainerDetails({ container }: Props) {
  return (
    <Grid container spacing={4}>
      {/* Left Column: Map + Shipping Info */}
      <Grid item xs={12} md={6}>
        {/* Map with container coords */}
        <Card sx={{ overflow: "hidden", height: 300 }}>
          <Map lat={container.location.lat} lon={container.location.lon} />
        </Card>

        {/* Shipping details card */}
        <Card sx={{ mt: 3, p: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Shipping Details
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Chip
                label={container.status}
                color={
                  container.status === "In Transit"
                    ? "primary"
                    : container.status === "Delayed"
                    ? "warning"
                    : "success"
                }
                sx={{ fontWeight: "bold", fontSize: "0.9rem" }}
              />
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Company:</strong> {container.shippingCompany}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Departure Port:</strong> {container.departurePort}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Arrival Port:</strong> {container.arrivalPort}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>ETA:</strong> {new Date(container.eta).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Right Column: Chart + Table */}
      <Grid item xs={12} md={6}>
        {/* Chart for historical data */}
        <Card sx={{ p: 2, boxShadow: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Temperature & Humidity Trends
          </Typography>
          <Chart history={container.history} />
        </Card>

        {/* Table of on-chain sensor readings */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Sensor Readings (On-Chain)
          </Typography>
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>Time</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Temperature (°C)
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Humidity (%)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {container.history.map((entry, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                    }}
                  >
                    <TableCell>{entry.time}</TableCell>
                    <TableCell>{entry.temperature}</TableCell>
                    <TableCell>{entry.humidity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </Grid>
  );
}
