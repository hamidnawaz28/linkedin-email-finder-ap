import { useState } from 'react'
import { ActionButton, AdornmentInput, Typography } from '../../components'
import { Box, Divider, Button } from '@mui/material'
import { useContext } from 'react';
import { ScreenContext } from '../../context';
import { toast } from 'react-toastify';
import { signUpUser, signInWithGoogle } from '../../firebase/authentication';

const Login = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const { setCurrentScreen } = useContext(ScreenContext)

    const onSignUpHandle = async () => {
        const signUp = await signUpUser(name, email, password)
        if (signUp.success) {
            toast.success(signUp.message)
            setCurrentScreen('signIn')
        }
        else {
            toast.error(signUp.message)
        }
    }

    const signInHandle = () => {
        setCurrentScreen('signIn')
    }
    const googleSignInHandle = async () => {
        const response = await signInWithGoogle()
    }
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gridGap: 20
        }}>
            {/* <Button onClick={googleSignInHandle} sx={{ color: 'white', backgroundColor: '#e07a5f' }}>Sign Up With Google</Button>
            <Divider>OR</Divider>
            <Typography>Sign up using email</Typography> */}
            <AdornmentInput label='Name' value={name} setValue={setName} />
            <AdornmentInput label='Email' value={email} setValue={setEmail} />
            <AdornmentInput label='Password' value={password} setValue={setPassword} />
            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                <Typography label="Already Have an account? " />
                <Box onClick={signInHandle} sx={[
                    {

                        color: "blue",
                        '&:hover': {
                            cursor: "pointer"
                        },
                    },
                ]}>
                    Sign In
                </Box>

            </Box>
            <ActionButton label='Sign Up' onClick={onSignUpHandle} />
        </Box >
    )
}

export default Login