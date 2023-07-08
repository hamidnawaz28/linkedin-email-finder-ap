import React from "react";
import { Box, Typography, Input, Button } from "@mui/material";
import { newsLetterEmails } from "@firebase/api";
import { useState } from "react";
import { toast } from "react-toastify";
const Footer = () => {
  const [email, setEmail] = useState("");
  const emailSubscribeHandle = async () => {
    await newsLetterEmails(email);
    toast.success("Successfully subscribed for new letter");
  };
  return (
    <Box sx={style.container}>
      <Box sx={style.newsLetter}>
        <Typography fontWeight={"500"} variant="body2" sx={{ color: "white" }}>
          Subscribe
        </Typography>
        <Typography fontWeight={"500"} variant="h6" sx={{ color: "white" }}>
          Stay up-to-data with
        </Typography>
        <Typography fontWeight={"500"} variant="h6" sx={{ color: "white" }}>
          what we are doing
        </Typography>
        
        <Box sx={{ display: "flex", flexDirection: "column", gridGap: "20px" }}>
          <Input
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            sx={{ width: "300px", color: "white" }}
            placeholder="Type email here"
          />
          <Button
            onClick={emailSubscribeHandle}
            variant="contained"
            sx={{ backgroundColor: "secondary.main", color: "white" }}
          >
            Subscribe
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gridGap: "20px", alignItems: "center" }}>
          <img src="/assets/logo.png" width="40px" alt="" />
          <Typography
            fontWeight={"400"}
            sx={[
              {
                color: "white",
                ":hover": {
                  cursor: "pointer",
                },
              },
            ]}
          >
            AP Email Finder
          </Typography>
        </Box>
        <Typography variant="subtitle2" sx={{ color: "white" }}>
          All rights reserved @2023
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;

const style = {
  container: {
    height: "200px",
    backgroundColor: "primary.main",
    borderRadius: "20px",
    padding: "20px",
  },
  newsLetter: {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
  },
};
