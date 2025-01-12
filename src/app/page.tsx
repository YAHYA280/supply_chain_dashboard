"use client";

import { Container, Box, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ pt: 6, pb: 6 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Welcome to the Container Tracking Project
        </Typography>
        <Typography variant="body1" paragraph>
          This application helps you track the real-time location, temperature,
          and humidity of shipping containers worldwide.
        </Typography>
        <Typography variant="body1">
          Use the{" "}
          <Box component="span" fontWeight="bold">
            Dashboard
          </Box>{" "}
          link in the navigation bar to view container details.
        </Typography>
      </Box>
    </Container>
  );
}
