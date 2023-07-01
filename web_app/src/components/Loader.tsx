import React from 'react'
import { CircularProgress, Box } from '@mui/material'

const Loader = () => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            height: "400px",
            alignItems: 'center'
        }}>
            <CircularProgress />
        </Box>
    )
}

export default Loader