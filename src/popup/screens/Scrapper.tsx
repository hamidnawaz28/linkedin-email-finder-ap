import { Box, TextField, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { MESSAGING } from '../../common/constants'
import { MessagingMethods, OtherBrowerMethods } from '../../common/browserMethods'
import { ActionButton } from '../../components'
import { ScreenContext } from '../../context'

import { toast } from 'react-toastify'
import { auth } from '../../firebase'
import { getUserQuota } from '../../firebase/api'
import { getPagesToScrap, updatePageToScrap } from '../../common/services'
const { tabMesage, runTimeMessage, } = new MessagingMethods();



const Scrapper = () => {
    const { setCurrentScreen } = useContext(ScreenContext);
    const [pagesToScrap, setPagesToScrap] = useState(3)
    const [paid, setPaid] = useState(false)
    const [quota, setQuota] = useState(0)

    const onStartHandle = async () => {
        const currentLocation = await tabMesage({ message: MESSAGING.GET_PAGE_URL_CONTENT, data: {} })

        const onPeopleSearch = currentLocation.includes("https://www.linkedin.com/search/results/people")
        if (!auth.currentUser) {
            toast.error('Please login')
            setCurrentScreen('signIn')
            return
        }
        else if ((paid || quota !== 0) && onPeopleSearch) {
            setCurrentScreen('exportPage')
            await tabMesage({
                message: MESSAGING.START_PARTIAL_PROFILES_DATA_COLLECTION,
                data: { pagesToScrap }
            })
        }
        else if (!onPeopleSearch) {
            toast.error('Navigate to people search page on linkedin')
        }
        else {
            toast.error('Trial Expired, subscribe to continue.')
        }
    }

    const numberOfPagesChangeHandle = (e: any) => {
        const newPages = e.target.value
        setPagesToScrap(newPages)
        updatePageToScrap(newPages)
    }

    const updateQuota = async () => {
        if (auth.currentUser?.email) {
            const quota = await getUserQuota(auth.currentUser.email)
            setQuota(quota)
        }
    }

    const initUser = async () => {
        await updateQuota()
        setPagesToScrap(await getPagesToScrap())
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
                    p: 3
                }}>

                    <img
                        src={'logo.png'}
                        width='100px'
                        alt=''
                    />
                </Box>
                <Box>
                    {
                        !paid ? <Typography>
                            Trial version, {quota} emails left
                        </Typography> : null
                    }
                </Box>

                <TextField
                    label="Number of pages"
                    type="number"
                    onChange={numberOfPagesChangeHandle}
                    value={pagesToScrap}
                    variant="filled"
                    disabled={false}
                />
                <ActionButton label="Start" onClick={onStartHandle} disabled={false} />
            </Box>
        </Box>
    )
}

export default Scrapper