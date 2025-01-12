// File: src/components/Chart.tsx
"use client";

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
  time: string; // string representation of date/time
  temperature: number;
  humidity: number;
}

interface ChartProps {
  history: HistoryEntry[];
}

export default function Chart({ history }: ChartProps) {
  // For Recharts, we just pass the data array
  // e.g. [ { time: '1/12/2025, 3:00:00 PM', temperature: 6, humidity: 65 }, ... ]

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        Temperature &amp; Humidity Chart
      </Typography>
      <Box sx={{ width: "100%", height: 250 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history}>
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="temperature"
              stroke="#f97316" // orange color
              strokeWidth={2}
              name="Temp (°C)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="humidity"
              stroke="#3b82f6" // blue color
              strokeWidth={2}
              name="Humidity (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
