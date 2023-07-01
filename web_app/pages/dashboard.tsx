import React from "react";
import { Header, Footer, Loader } from "@components";
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@firebase";
import { useRouter } from "next/router";
import { getUsersData } from "@firebase/api";
import { Box, Typography, Button } from '@mui/material'

const Dashboard = () => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)
    const [subscriptionData, setSubscriptionData] = useState<any>(null)
    const router = useRouter()

    const initUser = async () => {
        onAuthStateChanged(auth, async (user) => {
            setLoading(true)
            if (user) {
                setUser(user)
                const email = user.email || ''
                const userSubData: any = await getUsersData(email)
                if (userSubData?.package) {
                    setSubscriptionData(userSubData)
                } else {
                    router.push("/")
                }
            } else {
                router.push("/sign-in")
            }
            setLoading(false)
        });
    }

    useEffect(() => {
        initUser()
    }, [])

    return (
        <div>
            <Header />
            {
                loading ? <Loader /> : <Box sx={{
                    margin: 'auto',
                    p: 50,
                    pb: 100,
                    width: 'fit-content'
                }}>
                    <BoxWrapper label={'Package: '} value={subscriptionData?.package} />
                    {
                        subscriptionData?.package == 'trial' ? <BoxWrapper label={'Quota Left:'} value={subscriptionData?.quota} /> : null
                    }
                    <BoxWrapper label={'Access Token:'} value={subscriptionData?.token} />
                    {
                        subscriptionData?.package == 'premium' ? <BoxWrapper label={'Paypal Subscription Id: '} value={subscriptionData?.subscriptionId} /> : null
                    }
                    {
                        subscriptionData?.package == 'trial' ? <Box sx={{
                            display: 'flex',
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Button sx={{
                                alignSelf: 'center',
                                mt: 30
                            }} onClick={() => router.push('/')}> Upgrade To Premium</Button>
                        </Box> : null
                    }
                </Box>
            }
            <Footer />
        </div>
    );
};

export default Dashboard;

const BoxWrapper = ({ label, value }: any) => {
    return <Box sx={{
        display: "flex",
        alignItems: 'center',
        flexDirection: 'row',
        gridGap: 50,
        p: 10,
        '&.p:nth-child(1)': {
            backgroundColor: "cadetblue"
        }
    }}><Typography sx={{
        fontWeight: 'bold'
    }}>{label}</Typography>
        <Typography>{value}</Typography></Box>
}