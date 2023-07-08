import React from "react";
import { Header, Footer } from "@components";
import { Typography, Box } from "@mui/material";
const AboutUs = () => {
  return (
    <div>
      <Header />

      <Box sx={{ width: "70%", margin: "auto", py: "90px" }}>
        <Typography fontSize="30px">
          The LinkedIn Profile Scraper - Email Detector Extension is a
          game-changing tool for professionals seeking to maximize their
          LinkedIn experience. By providing seamless profile data extraction,
          email detection capabilities, and customizable settings, the extension
          enhances productivity and facilitates effective networking. With
          privacy and security at its core, the extension empowers users to
          build meaningful connections, explore business opportunities, and
          unlock their true networking potential on LinkedIn. Embrace the power
          of the LinkedIn Profile Scraper - Email Detector Extension and elevate
          your LinkedIn experience to new heights.
        </Typography>
        <Box sx={{pt:'20px'}}>

        <Typography fontSize="30px" fontWeight={'bold'}>
          Contact
        </Typography>
        <Typography fontSize="20px"  >
          info@hamidnawaz.com
        </Typography>
        </Box>
      </Box>

      <Footer />
    </div>
  );
};

export default AboutUs;
