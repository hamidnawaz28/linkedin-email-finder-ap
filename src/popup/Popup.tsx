import { Divider } from 'antd'
import { useContext, useEffect, ReactNode } from 'react'
import { ScreenContext } from '../context'
import Auth from './screens/Auth'
import ExportPage from './screens/ExportPage'
import Scrapper from './screens/Scrapper'
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import Subscriptions from './screens/Subscriptions'
import { addADoc } from '../firebase'
import { signUpUser } from '../firebase/authentication'
import { auth } from '../firebase'
import { extPay } from '../extension-subscription'
import { getAllData } from '../common/services'
import { SCRAPING_STATUS } from '../common/constants'

interface screensObjProps {
    [key: string]: any
}

const screensObject: screensObjProps = {
    "scrapper": <Scrapper />,
    "exportPage": <ExportPage />,
    "auth": <Auth />,
    "subscriptions": <Subscriptions />,
    "signIn": <SignIn />,
    "signUp": <SignUp />,
}

const Popup = () => {
    const { currentScreen, setCurrentScreen } = useContext(ScreenContext)
    const CurrentScreen = () => screensObject[currentScreen]

    const initRoute = async () => {
        const allData = await getAllData()
        const userLogedIn = auth.currentUser
        const userPaid = await extPay.ifUserPaid()
        if (allData.status == SCRAPING_STATUS.COLLECTING_PROFILES_COMPLETE_DATA || allData.status == SCRAPING_STATUS.COLLECTING_PROFILES_PARTIAL_DATA) {
            setCurrentScreen("exportPage")
        }
        else if (userLogedIn && userPaid) {
            setCurrentScreen("scrapper")
        } else if (userLogedIn && !userPaid) {
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