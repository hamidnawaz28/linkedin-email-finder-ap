import { Button, Box } from '@mui/material';
import { useContext } from 'react';
import { ScreenContext } from '../../context';
import { Typography, LogoLabel } from '../../components';

const Auth = () => {

    const { setCurrentScreen } = useContext(ScreenContext)

    const signInHandle = () => {
        setCurrentScreen('signIn')
    }
    const signUpHandle = () => {
        setCurrentScreen('signUp')
    }

    return (
        <Box sx={{ display: 'grid', gridGap: 20 }}>
            <LogoLabel label='AP Linkedin Lead Finder' />
            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                <Typography label="You are not logged in yet." />
            </Box>
            <Button variant="contained" color="primary" onClick={signInHandle}>
                Sign In
            </Button>

            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                <Typography label="Don't have an account yet?" />
            </Box>
            <Button variant="outlined" color="primary" onClick={signUpHandle}>
                Sign Up
            </Button>
        </Box>
    );
};

export default Auth;