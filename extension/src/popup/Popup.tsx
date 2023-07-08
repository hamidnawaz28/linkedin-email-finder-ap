import { Divider } from 'antd'
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { Subscription, ExportPage, Scrapper } from './screens'
import { getAllData } from '../common/services'
const Popup = () => {

    const [loading, setLoading] = useState(true)
    const [scraping, setScraping] = useState(false)
    const [user, setUser] = useState({})

    const initData = async () => {
        const data = await getAllData()
         
        setUser(data.user)
        setLoading(false)
    }

    useEffect(() => {
        initData();
    }, [])


    return <Box>
        {
            loading ? null : <Box>
                <Divider />
                {
                    Object.keys(user).length > 0 ? <Scrapper setUser={setUser} user={user} /> : <Subscription setUser={setUser} />
                }
                <Divider />
                {
                    scraping && user ? <Box>
                        <ExportPage />
                        <Divider />
                    </Box> : null
                }

            </Box>
        }
    </Box>
}

export default Popup