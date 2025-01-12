"use client";

import { Container, Box, Typography, Divider } from "@mui/material";

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ pt: 6, pb: 6 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Welcome to the Container Tracking Project
        </Typography>
        <Typography variant="body1" paragraph>
          This application provides real-time tracking of shipping containers,
          monitoring key parameters such as location, temperature, and humidity
          to ensure the safe transport of goods.
        </Typography>
        <Typography variant="body1" paragraph>
          The goal of this project is to enhance supply chain transparency by
          integrating IoT sensors with blockchain technology for secure and
          immutable data logging.
        </Typography>
        <Typography variant="body1">
          Use the{" "}
          <Box component="span" fontWeight="bold">
            Dashboard
          </Box>{" "}
          link in the navigation bar to view detailed container information.
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
          Project Team
        </Typography>
        <Typography variant="body1" paragraph>
          This project was collaboratively developed by:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mt: 1 }}>
          <li>
            <Typography variant="body1">
              <strong>Yahya Elmokhtari</strong> - FrontEnd
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Souhail ELMAHDANI</strong> - Blockchain
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Yassin Riahi</strong> - Back End
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <strong>Amin Boulzmin</strong> - IoT and Sensors
            </Typography>
          </li>
        </Box>
      </Box>
    </Container>
  );
}
