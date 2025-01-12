"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography, Box } from "@mui/material";

interface HistoryEntry {
  time: string;
  temperature: number;
  humidity: number;
}
interface ChartProps {
  history: HistoryEntry[];
}

function formatLabel(dateString: string) {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:00`;
}

export default function Chart({ history }: ChartProps) {
  const data = history.map((entry) => ({
    time: formatLabel(entry.time),
    temperature: entry.temperature,
    humidity: entry.humidity,
  }));

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        Temperature &amp; Humidity Chart
      </Typography>
      <Box sx={{ width: "100%", height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="temperature"
              stroke="#f97316" // orange
              strokeWidth={2}
              name="Temp (°C)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="humidity"
              stroke="#3b82f6" // blue
              strokeWidth={2}
              name="Humidity (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
