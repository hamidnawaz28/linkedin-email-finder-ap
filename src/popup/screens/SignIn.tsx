import { useEffect, useState } from 'react'
import { ActionButton, AdornmentInput, Typography } from '../../components'
import { Box } from '@mui/material'
import { useContext } from 'react';
import { ScreenContext } from '../../context';
import { toast } from 'react-toastify';
import { signInUser, signInWithGoogle } from '../../firebase/authentication';
import { extPay } from '../../extension-subscription';
import { auth } from '../../firebase';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setCurrentScreen } = useContext(ScreenContext)

    const onSignInHandle = async () => {
        const signIn = await signInUser(email, password, true)
        if (signIn.success) {
            toast.success(signIn.message)
            const userData = await extPay.getUser()
            if (userData.paid) setCurrentScreen('scrapper')
            else setCurrentScreen('subscriptions')
        }
        else {
            toast.error(signIn.message)
        }
    }

    const signUpHandle = () => {
        setCurrentScreen('signUp')
    }

    const googleSignInHandle = () => {
        signInWithGoogle()
    }

    useEffect(() => {
        if (auth.currentUser) {
            toast.info('Already signed in.')
            setCurrentScreen('subscriptions')
        }
    }, [])
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gridGap: 20
        }}>
            {/* <Button onClick={googleSignInHandle} sx={{ color: 'white', backgroundColor: '#e07a5f' }}>Sign In With Google</Button>
            <Divider>OR</Divider>
            <Typography>Sign in using email</Typography> */}
            <AdornmentInput label='Email' value={email} setValue={setEmail} />
            <AdornmentInput label='Password' value={password} setValue={setPassword} />

            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                <Typography label="Dont' have an account? " />
                <Box onClick={signUpHandle} sx={[
                    {
                        color: "blue",
                        '&:hover': {
                            cursor: "pointer"
                        },
                    },

                ]}>
                    Sign Up
                </Box>

            </Box>

            <ActionButton label='Login' onClick={onSignInHandle} />
        </Box >
    )
}

export default Login