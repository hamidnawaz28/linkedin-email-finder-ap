import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { auth, logOut } from '@firebase'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";

const Header = () => {
    const [authorized, setAuthorized] = useState(false)

    const userAuthenticated = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthorized(true)
            } else {
                setAuthorized(false)
            }
        });
    }

    const signOutHandle = () => {
        logOut()
    }

    const router = useRouter()

    useEffect(() => {
        userAuthenticated()
    }, [])

    return (
        <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', width: '70%', margin: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', gridGap: '15px' }}>
                <img src="/assets/logo.png" width='40px' alt="" />
                <Typography fontWeight={'400'} sx={[{
                    ':hover': {
                        cursor: 'pointer'
                    }
                }]}>AP Email Finder</Typography>

            </Box>
            <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', gridGap: '50px' }}>

                <Box onClick={() => {
                    router.push(`/`);
                }}    >
                    <Typography fontWeight={'400'} sx={[{
                        ':hover': {
                            cursor: 'pointer'
                        }
                    }]}>Home
                    </Typography>
                </Box>
                {
                    authorized ? <Box onClick={() => {
                        router.push(`/dashboard`);
                    }}    >
                        <Typography fontWeight={'400'} sx={[{
                            ':hover': {
                                cursor: 'pointer'
                            }
                        }]}>Dashboard
                        </Typography>
                    </Box> : null
                }
            </Box>
            <Box>
                {
                    authorized ?
                        <Button onClick={signOutHandle}>
                            Sign Out
                        </Button> :
                        <Button onClick={() => router.push('/auth')}
                        >
                            Get Started
                        </Button>
                }

            </Box>
        </Box>
    )
}

export default Header