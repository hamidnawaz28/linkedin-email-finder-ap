import { Divider } from 'antd'
import { useContext, useEffect, ReactNode } from 'react'
import { ScreenContext } from '../context'

import ExportPage from './screens/ExportPage'
import Scrapper from './screens/Scrapper'

import { addADoc } from '../firebase'
import { signUpUser } from '../firebase/authentication'
import { auth } from '../firebase'

import { getAllData } from '../common/services'
import { SCRAPING_STATUS } from '../common/constants'

interface screensObjProps {
    [key: string]: any
}

const screensObject: screensObjProps = {
    "scrapper": <Scrapper />,
    "exportPage": <ExportPage />,
}

const Popup = () => {
    const { currentScreen, setCurrentScreen } = useContext(ScreenContext)
    const CurrentScreen = () => screensObject[currentScreen]

    const initRoute = async () => {
        const allData = await getAllData()
        const userLogedIn = auth.currentUser

        if (allData.status == SCRAPING_STATUS.COLLECTING_PROFILES_COMPLETE_DATA || allData.status == SCRAPING_STATUS.COLLECTING_PROFILES_PARTIAL_DATA) {
            setCurrentScreen("exportPage")
        }
        else if (userLogedIn) {
            setCurrentScreen("scrapper")
        } else if (userLogedIn) {
            setCurrentScreen("subscriptions")
        } else if (!userLogedIn) {
            setCurrentScreen("auth")
        }
    }
    useEffect(() => {
        initRoute()
    }, [])

    return <div>
        <Divider />
        <CurrentScreen />
        <Divider />
    </div>
}

export default Popup