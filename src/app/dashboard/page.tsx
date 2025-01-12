"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import Dashboard from "@/components/Dashboard";
import { ContainerData } from "@/types/container";

export default function DashboardPage() {
  const [containers, setContainers] = useState<ContainerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/containers");
        if (!res.ok) {
          throw new Error(`Failed to fetch containers: ${res.statusText}`);
        }
        const data = await res.json();
        setContainers(data);
      } catch (err) {
        console.error("Error fetching containers:", err);
        setError("Unable to load container data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Loading State
  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgcolor="grey.100"
      >
        <Card
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ mb: 2, color: "primary.main" }} />
          <Typography variant="h6" component="p" sx={{ fontWeight: 600 }}>
            Loading containers...
          </Typography>
        </Card>
      </Box>
    );
  }

  // Error State
  if (error) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgcolor="grey.100"
      >
        <Card sx={{ maxWidth: 400, p: 3, textAlign: "center" }}>
          <Typography
            variant="h5"
            component="h2"
            color="error"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Error
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {error}
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => location.reload()}
          >
            Retry
          </Button>
        </Card>
      </Box>
    );
  }

  // No Data State
  if (containers.length === 0) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgcolor="grey.100"
      >
        <Card sx={{ maxWidth: 500, p: 3, textAlign: "center" }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            No container data available
          </Typography>
          <Typography variant="body1" color="text.secondary">
            It looks like there’s no container information to display. Please
            check back later.
          </Typography>
        </Card>
      </Box>
    );
  }

  // Success: Show Dashboard
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.100", pb: 6 }}>
      {/* Page Header */}
      <Container sx={{ pt: 4, pb: 2 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Select a container to view its current location, shipping details, and
          temperature/humidity logs.
        </Typography>
      </Container>

      {/* Main "card" for the dashboard content */}
      <Container sx={{ mt: 3 }}>
        <Card sx={{ p: 3 }}>
          <CardContent>
            <Dashboard containers={containers} />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
