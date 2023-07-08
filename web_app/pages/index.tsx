import React from "react";
import { Subscription, Header, Footer } from "@components";
import { Box, Typography } from "@mui/material";
const index = () => {
  return (
    <Box>
      <Header />
      <Box sx={{ width: "70%", margin: "auto", py: "100px" }}>
        <Box sx={{ display: "flex", gridGap: "30px" }}>
          <Box sx={{ paddingTop: "100px" }}>
            <Typography variant="h6">
              A powerful extension, to power your data
            </Typography>
            <Typography
              variant="body1"
              sx={{ paddingTop: "100px", fontSize: "30px" }}
            >
              Our LinkedIn Email Finder - Extension is a powerful tool designed
              to enhance your LinkedIn experience. With this extension, you can
              effortlessly extract valuable profile data and detect user emails
              directly from LinkedIn profiles
            </Typography>
          </Box>
          <img src="scrapping.png" alt="" />
        </Box>
        <LandingSection />
        <Subscription />
      </Box>
      <Footer />
    </Box>
  );
};

export default index;

const LandingSection = () => {
  return (
    <Box sx={{ py: "150px" }}>
      <Typography variant="h6" sx={{textAlign:'center'}}>Key Features</Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gridGap: "30px",
          py: "100px",
        }}
      >
        <FeatureWrap
          title="Profile Data Extraction: Seamlessly scrape essential profile
        information such as name, job title, company, education, skills, and
        more from LinkedIn profiles."
        />
        <FeatureWrap
          title="Email Detection: Identify and extract email addresses associated
        with user profiles, enabling you to expand your professional network
        and reach out to potential leads."
        />
        <FeatureWrap
          title="Advanced Scraping Capabilities: Our extension utilizes advanced
        algorithms to ensure accurate and reliable data extraction,
        providing you with comprehensive insights."
        />
        <FeatureWrap
          title="Privacy and Security: We prioritize user privacy and comply with
        LinkedIn terms of service. Your data remains secure and
        confidential."
        />
      </Box>
    </Box>
  );
};

const FeatureWrap = ({ title }: any) => {
  return (
    <Box sx={{ boxShadow: 3, borderRadius: "5px" }}>
      <Typography
        variant="body1"
        sx={{
          padding: "30px",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};
