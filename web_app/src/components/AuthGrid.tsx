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
                backgroundColor: 'primary.main',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>
                <img src="scrapping.png" alt="" />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{children}</Box>
        </Box>
    )
}

export default AuthGrid