import { useEffect, useState } from 'react'

import { Box, Button, Typography } from '@mui/material'

import { toast } from 'react-toastify';
import { signInUser, signInWithGoogle } from '@firebase/authentication';
import { auth } from '@firebase'
import { AdornmentInput, AuthGrid, LogoLabel } from '@components';
import { useRouter } from 'next/router'


const SignIn = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const signInHandle = async () => {
        const response = await signInUser(email, password, true)

        if (response.success) {
            toast.success(response.message)
            router.push('/')
        }
        else {
            toast.error(response.code)
        }
    }

    const signUpHandle = () => {
        router.push('/sign-up')
    }



    useEffect(() => {
        if (auth.currentUser) {
            // toast.info('Already signed in.')
        }
    }, [])

    return (
        <AuthGrid>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: '90%',
                gridGap: 20
            }}>
                <LogoLabel label='Sign in to your account' />
                <AdornmentInput label='Email' value={email} setValue={setEmail} />
                <AdornmentInput label='Password' value={password} setValue={setPassword} />
                <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', gridGap: 3 }}>
                    <Typography>
                        Dont have an account?
                    </Typography>
                    <Box onClick={signUpHandle} sx={[
                        {
                            color: "info.dark",
                            '&:hover': {
                                cursor: "pointer"
                            },
                        },

                    ]}>
                        Sign Up
                    </Box>
                </Box>
                <Button onClick={signInHandle}>Sign In</Button>
            </Box >
        </AuthGrid>
    )
}

export default SignIn