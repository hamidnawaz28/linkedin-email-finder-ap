import { Box, Typography } from '@mui/material'
import React from 'react'

const LogoLabel = ({ label }: any) => {
  return (
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        gridGap: "40px",
        pt: 2,
        pb: 2,
      }}
    >
      <img src={'/assets/logo.png'} alt="" width="70px" />
      <Typography variant="h5" gutterBottom>
        {label}
      </Typography>
    </Box>
  )
}

export default LogoLabel
