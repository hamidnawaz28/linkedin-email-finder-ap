import { useState } from 'react'
import { Box, Divider, Button, Typography } from '@mui/material'
import { useContext } from 'react';
import { signUpUser, signInWithGoogle } from '@firebase/authentication';
import { AdornmentInput, AuthGrid, LogoLabel } from '@components';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'
import { logOut, auth } from '@firebase/apps';
import { onAuthStateChanged } from 'firebase/auth';

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')


    const onSignUpHandle = async () => {
        const response = await signUpUser(name, email, password)
        if (response.success) {
            toast.success(response.message)
        }
        else {
            toast.error(`Error: ${response.code}`)
        }
    }

    const signInHandle = async () => {

        // await logOut()
        router.push('/sign-in')
    }

    const googleSignInHandle = async () => {
        const response = await signInWithGoogle()
    }

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
                <LogoLabel label='Create a new account' />
                <AdornmentInput label='Name' value={name} setValue={setName} />
                <AdornmentInput label='Email' value={email} setValue={setEmail} />
                <AdornmentInput label='Password' value={password} setValue={setPassword} />
                <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', gridGap: 3 }}>
                    <Typography>
                        Already have an account?
                    </Typography>
                    <Box onClick={signInHandle} sx={[
                        {
                            color: "info.dark",
                            '&:hover': {
                                cursor: "pointer"
                            },
                        },
                    ]}>
                        Sign In
                    </Box>
                </Box>
                <Button onClick={onSignUpHandle}>Sign Up</Button>
            </Box >
        </AuthGrid>
    )
}

export default Login