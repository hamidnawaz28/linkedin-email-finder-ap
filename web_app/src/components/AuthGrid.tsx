import React from 'react'
import { Box } from '@mui/material'

const AuthGrid = ({ children }: any) => {
    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: '65% 35%',
            height: '98vh'
        }}>
            <Box sx={{
                backgroundColor: 'primary.main'
            }}></Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{children}</Box>
        </Box>
    )
}

export default AuthGrid