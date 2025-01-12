"use client";

import React from "react";
import { ContainerData } from "@/types/container";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Map from "./Map";
import Chart from "./Chart";

interface Props {
  container: ContainerData;
}

export default function ContainerDetails({ container }: Props) {
  return (
    <Grid container spacing={3}>
      {/* Left Column: Map + Shipping Info */}
      <Grid item xs={12} md={6}>
        {/* MAP */}
        <Map lat={container.location.lat} lon={container.location.lon} />

        {/* Shipping Info Card */}
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Shipping Details
            </Typography>
            <Typography variant="body1">
              <strong>Company:</strong> {container.shippingCompany}
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong> {container.status}
            </Typography>
            <Typography variant="body1">
              <strong>Departure Port:</strong> {container.departurePort}
            </Typography>
            <Typography variant="body1">
              <strong>Arrival Port:</strong> {container.arrivalPort}
            </Typography>
            <Typography variant="body1">
              <strong>ETA:</strong> {new Date(container.eta).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Right Column: Chart + Logs */}
      <Grid item xs={12} md={6}>
        <Chart history={container.history} />

        {/* Historical Log Table */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Full Temperature / Humidity Log
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Time</TableCell>
                  <TableCell>Temperature (°C)</TableCell>
                  <TableCell>Humidity (%)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {container.history.map((entry) => (
                  <TableRow key={entry.time}>
                    <TableCell>
                      {new Date(entry.time).toLocaleString()}
                    </TableCell>
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
