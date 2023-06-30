
import { useRouter } from 'next/router';
import { auth, userSignedIn } from '@firebase';
import {
    JSXElementConstructor,
    ReactElement,
    useEffect,
    useState,
} from 'react';
import { Box } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';

const RouteGuard = (props: {
    children: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
}) => {
    const router = useRouter();
    const { children } = props;
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push('/sign-in')
            }
            setLoading(false)
        })
    }, []);

    return loading ? <Box> Loading </Box> : children

};

export default RouteGuard;