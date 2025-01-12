"use client";

import React, { useState } from "react";
import { ContainerData } from "@/types/container";
import { Box, Typography, Paper } from "@mui/material";
import ContainerSelector from "./ContainerSelector";
import ContainerDetails from "./ContainerDetails";

interface DashboardProps {
  containers: ContainerData[];
}

export default function Dashboard({ containers }: DashboardProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedContainer = containers[selectedIndex];

  return (
    <Box>
      {/* Title / Description could be handled in your DashboardPage, or here */}
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Container Overview
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Select a container to view its location and shipping details.
      </Typography>

      {/* 1) Selector of containers */}
      <ContainerSelector
        containers={containers}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      />

      {/* 2) Container Details (Map, Chart, Info) - wrapped in Paper for a card look */}
      <Paper sx={{ mt: 3, p: 2 }} elevation={3}>
        <ContainerDetails container={selectedContainer} />
      </Paper>
    </Box>
  );
}
