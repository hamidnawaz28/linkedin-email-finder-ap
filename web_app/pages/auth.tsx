import { Button, Box, Typography } from '@mui/material';
import { LogoLabel, AuthGrid } from '@components';
import { useRouter } from 'next/router'

const Auth = () => {
    const router = useRouter()
    const signInHandle = () => {
        router.push('/sign-in')
    }
    const signUpHandle = () => {
        router.push('/sign-up')
    }

    return (
        <AuthGrid>
            <Box sx={{ display: 'grid', gridGap: 20, p: 5, width: '90%', }}>
                <LogoLabel label='Sign in or create an account' />
                <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                    <Typography >You are not logged in yet.</Typography>
                </Box>
                <Button variant="contained" color="primary" onClick={signInHandle}>
                    Sign In
                </Button>

                <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                    <Typography >Dont have an account yet?</Typography>

                </Box>
                <Button variant="outlined" color="primary" onClick={signUpHandle}>
                    Sign Up
                </Button>
            </Box>
        </AuthGrid>
    );
};

export default Auth;