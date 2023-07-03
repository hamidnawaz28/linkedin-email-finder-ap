import { Box, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { MESSAGING } from '../../common/constants'
import { MessagingMethods } from '../../common/browserMethods'
import { ActionButton } from '../../components'
import { toast } from 'react-toastify'
import { updatePageToScrap } from '../../common/services'
import { getAllData } from '../../common/services'
import { getUserData } from '../../firebase/firestoreMethods'
import { verifyPaypalSubscription } from '../../firebase/api'
import { OtherBrowerMethods } from '../../common/browserMethods';
const otherBrowerMethods = new OtherBrowerMethods()

const { tabMesage } = new MessagingMethods();
const Scrapper = ({ user, setUser }: any) => {
    const [pagesToScrap, setPagesToScrap] = useState(3)
    const [onTrial, setOnTrial] = useState(false)
    const [quota, setQuota] = useState(0)
    const [showSubscribe, setShowSubscribe] = useState(false)
    const [loading, setLoading] = useState(true)

    const onStartHandle = async () => {
        const localData = await getAllData()
        if (localData.user.package == 'trial') {
            const userData = await getUserData('token', localData.user.token)
            setOnTrial(true)
            setQuota(userData?.[0]?.quota)

            if (userData?.[0]?.quota < 1) {
                toast.error('Trial Finished, kindly subscribe')
                setShowSubscribe(true)
                return
            }
        } else {
            const paypalResp = await verifyPaypalSubscription(localData.user.subscriptionId)
            if (paypalResp.data.status != 'ACTIVE' && paypalResp.data.status != 'APPROVED') {
                toast.error('Subscription not active, kindly subscribe')
                setShowSubscribe(true)
                return
            }
        }

        const currentLocation = await tabMesage({ message: MESSAGING.GET_PAGE_URL_CONTENT, data: {} })
        const onPeopleSearch = currentLocation.includes("https://www.linkedin.com/search/results/people")
        if (!onPeopleSearch) {
            toast.error("Kindly navigate to people search page on linkedin, then start")
        } else {
            await tabMesage({
                message: MESSAGING.START_PARTIAL_PROFILES_DATA_COLLECTION,
                data: { pagesToScrap }
            })
        }
    }

    const numberOfPagesChangeHandle = (e: any) => {
        const newPages = e.target.value
        setPagesToScrap(newPages)
        updatePageToScrap(newPages)
    }

    const initUser = async () => {
        setLoading(true)
        const localData = await getAllData()
        if (localData.user.package == 'trial') {
            const userData = await getUserData('token', localData.user.token)
            setOnTrial(true)
            setQuota(userData?.[0]?.quota)

            if (userData?.[0]?.quota < 1) {
                setShowSubscribe(true)
                return
            }
        } else {
            const paypalResp = await verifyPaypalSubscription(localData.user.subscriptionId)
            if (paypalResp.data.status != 'ACTIVE' && paypalResp.data.status != 'APPROVED') {
                setShowSubscribe(true)
                return
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        initUser()
    }, [])

    return (
        <Box>
            <Box sx={{
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gridGap: 20
            }}>
                <Box sx={{
                    p: 1
                }}>

                    <img
                        src={'logo.png'}
                        width='100px'
                        alt=''
                    />
                </Box>
                <Box>
                    {
                        onTrial ? <Typography>
                            Trial version, {quota} emails left
                        </Typography> : null
                    }
                </Box>

                <TextField
                    label="Number of pages"
                    type="number"
                    onChange={numberOfPagesChangeHandle}
                    value={pagesToScrap}
                    InputProps={{ inputProps: { min: 1, max: 5 } }}
                    variant="filled"
                    disabled={false}
                    sx={{ width: '70%' }}
                />
                <ActionButton label="Start" onClick={onStartHandle} disabled={false} />

                {
                    showSubscribe || onTrial ? <>
                        <Typography>
                            OR
                        </Typography>
                        <ActionButton label="Subscribe" onClick={() => { () => otherBrowerMethods.createATab('https://www.google.com') }} disabled={false} />
                    </> : null
                }
            </Box>
        </Box>
    )
}

export default Scrapper