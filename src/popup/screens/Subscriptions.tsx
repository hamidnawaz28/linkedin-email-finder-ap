import { Box, Button, Radio, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { extPay } from '../../extension-subscription'
import { auth } from '../../firebase'
import { ScreenContext } from '../../context';
import { useContext } from 'react';
import { getUserQuota } from '../../firebase/api'

const plans = [{
    planName: 'Trial', price: 0, tagline: 'Upto 10 emails only'
}, {
    planName: 'Premium', price: 10, tagline: 'Unlimited emails'
}]

const SubscriptionCard = () => {
    const [selectedPlan, setSelectedPlan] = useState('')

    const { setCurrentScreen } = useContext(ScreenContext)
    const [quota, setQuota] = useState(0)
    const [paid, setPaid] = useState(false)
    const userPaid = async () => await extPay.ifUserPaid()

    const onProceedHandle = async () => {
        const trialPlan = plans[0].planName
        const premiumPlan = plans[1].planName

        if (selectedPlan == trialPlan && await extPay.ifUserPaid()) {
            toast.success("Already subscribed", { autoClose: 2000, })
            setCurrentScreen("scrapper")
        }
        else if (selectedPlan == trialPlan && quota > 0) {
            toast.success("You are on trial", { autoClose: 2000, })
            setCurrentScreen("scrapper")
        }
        else if (selectedPlan == trialPlan && quota <= 0) toast.error("Trial quota is over", { autoClose: 2000, })
        else if (selectedPlan == premiumPlan) {
            await extPay.openLoginPage()
        }
    }

    const onManageSubscription = async () => {
        await extPay.openLoginPage()
    }

    const updateQuota = async () => {
        if (auth.currentUser?.email) {
            const quota = await getUserQuota(auth.currentUser.email)
            setQuota(quota)
        }
        setPaid(await userPaid())
    }

    const onScrapStart = async () => {
        setCurrentScreen("scrapper")
    }
    useEffect(() => {
        updateQuota()
    }, [])

    return (
        <Box>

            {
                paid ?
                    <div>
                        <Typography sx={{ fontColor: 'white', opacity: 0.7 }}>
                            You are a premium member, Start scrapping
                        </Typography>
                        <Button variant='contained' color='primary' sx={{ width: '100%', margin: '40px 0px' }} onClick={onScrapStart}>Scrapper</Button>
                        <Typography sx={{ fontColor: 'white', opacity: 0.7 }}>
                            OR
                        </Typography>
                        <Button variant='contained' color='primary' sx={{ width: '100%', margin: '40px 0px' }} onClick={onManageSubscription}>Manage Subscription</Button>
                    </div> : <div>
                        <Box sx={{ padding: "20px 0px" }}>
                            <Typography sx={{ fontColor: 'white', fontWeight: 'bold', fontSize: 20 }}>
                                Choose a plan
                            </Typography> <Typography sx={{ fontColor: 'white', opacity: 0.7 }}>
                                Select a plan that best fit your needs
                            </Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gridGap: 20
                        }}>{plans.map((plan: CardItemInterface, key: number) => {
                            return <CardItem {...plan} key={key} selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
                        })}</Box>
                        <Button variant='contained' color='primary' sx={{ width: '100%', margin: '40px 0px' }} disabled={selectedPlan == ''} onClick={onProceedHandle}>Proceed</Button></div>
            }

        </Box >
    )
}


interface CardItemInterface {
    planName: string;
    price?: number;
    tagline: string
}

interface CardItemExtendeInterface extends CardItemInterface {
    selectedPlan: string,
    setSelectedPlan: any
}

const CardItem = ({ planName, price, tagline, selectedPlan, setSelectedPlan }: CardItemExtendeInterface) => {
    return <Box sx={[
        {
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            backgroundColor: '#e07a5f',
            color: 'white',
            padding: "10px 15px",
            borderRadius: "10px",
            '&:hover': {
                cursor: "pointer"
            },
        },
    ]}
        onClick={() => setSelectedPlan(planName)}>
        <Box sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
        }}>
            <Box><Radio checked={selectedPlan === planName} /></Box>
            <Box><Typography fontWeight={'bold'}>
                {
                    planName
                }
            </Typography>
                <Typography sx={{ fontColor: 'white', opacity: 0.8 }}>
                    {
                        tagline
                    }
                </Typography></Box>


        </Box>
        <Box sx={{ display: 'flex' }}>
            <Typography sx={{ fontColor: 'white', fontSize: 12, opacity: 0.8 }}>
                $
            </Typography><Typography fontWeight={'bold'} sx={{ fontSize: 25 }}>
                {
                    price
                }
            </Typography><Typography sx={{
                fontColor: 'white', opacity: 0.8, display: "flex",
                alignItems: "end"
            }}>
                /month
            </Typography>
        </Box>
    </Box>
}
export default SubscriptionCard