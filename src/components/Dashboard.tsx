// File: src/components/Dashboard.tsx
"use client";

import { ContainerData } from "@/types/container";
import { useState } from "react";
import ContainerSelector from "./ContainerSelector";
import ContainerDetails from "./ContainerDetails";
import { Box, Typography, Paper } from "@mui/material";

interface DashboardProps {
  containers: ContainerData[];
}

export default function Dashboard({ containers }: DashboardProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedContainer = containers[selectedIndex];

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        Container Overview
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Select a container to see location & shipping details.
      </Typography>

      {/* Container selection buttons */}
      <ContainerSelector
        containers={containers}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      />

      <Paper sx={{ mt: 3, p: 2 }} elevation={3}>
        <ContainerDetails container={selectedContainer} />
      </Paper>
    </Box>
  );
}
