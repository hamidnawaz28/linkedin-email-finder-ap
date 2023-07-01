import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box sx={style.container}>
            <Typography fontWeight={"500"} sx={{ color: "white", fontSize: "16px" }}>
                AP linkedin Email Finder
            </Typography>

            <Box> </Box>
        </Box>
    );
};

export default Footer;

const style = {
    container: {

        margin: "auto",
        display: "flex",
        justifyContent: "space-between",
        height: "200px",
        backgroundColor: "primary.main",
        borderRadius: "20px",
        padding: "20px",
    },
};
