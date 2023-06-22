

import { Box, Button, Typography } from '@mui/material';
import { DotWave } from '@uiball/loaders';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Browser from "webextension-polyfill";
import { MessagingMethods } from '../../common/browserMethods';
import { MESSAGING, SCRAPING_STATUS } from '../../common/constants';
import { downloadExcel } from '../../common/utils';
import { ScreenContext } from '../../context';

import { auth } from '../../firebase';
import { setUserQuota } from '../../firebase/api';

const { runTimeMessage } = new MessagingMethods()

const ProgressCard = () => <div>
    <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'column', gridGap: 30 }}>
        <Box sx={{ backgroundColor: '#e07a5f', width: '100%', height: 150, borderRadius: 5, display: "flex", alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'white', gridGap: 40 }}>
            <DotWave size={100} color="white" />
            <Typography sx={{ color: "white" }}>  Collecting Data!  </Typography>
        </Box>
        <Typography >Emails are getting extracted, hold on!</Typography>
    </Box>
</div>

const ExportCard = ({ count, text }: any) => <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gridGap: 30, backgroundColor: '#e07a5f', color: 'white', padding: 1, borderRadius: 2, width: '-webkit-fill-available' }}>
    <Typography sx={{ fontSize: 30, lineHeight: 1 }}>{count}</Typography>
    <Typography fontWeight={'bold'} sx={{ whiteSpace: 'nowrap', fontSize: '10px' }}>
        {text}
    </Typography>
</Box>



function ExportPage() {
    const { setCurrentScreen } = useContext(ScreenContext);
    const [profiles, setProfiles] = useState([])
    const [status, setStatus] = useState(SCRAPING_STATUS.IDLE)
    const [withEmails, setWithEmails] = useState([])
    const [profilesScrapped, setProfilesScrapped] = useState([])


    const okClickHandle = async () => {
        await runTimeMessage({
            message: MESSAGING.CHANGE_STATUS,
            data: {
                status: SCRAPING_STATUS.IDLE,
            },
        })
        setCurrentScreen("scrapper")
        toast.info("Scrapper Stopped!", { autoClose: 2000, })
    }


    const getProfiles = async () => {
        const allData = await runTimeMessage({ message: MESSAGING.GET_ALL_DATA })
        const profilesWithEmails = allData.profiles.filter((profil: any) => profil.email && profil.email != 'NOT_FOUND')
        setWithEmails(profilesWithEmails)

        const profilesWithScrappedStatus = allData.profiles.filter((profil: any) => profil.scrapped)
        setProfilesScrapped(profilesWithScrappedStatus)
        const exelData = allData.profiles.map((profile: any) => {
            return ([profile.profileUrl, profile.thumbnail, profile.tagline, profile.location,
            profile.username, profile.pictureUrl, profile.firstName, profile.lastName,
            profile.email, profile.phone, profile.websites, profile.address,
            profile.currentCompany, profile.currentDesignation,])
        })
        setProfiles(exelData)
        setStatus(allData.status)
    }


    useEffect(() => {
        getProfiles()
        Browser.runtime.onMessage.addListener((request) => {
            const { message } = request
            if (message == MESSAGING.FETCH_REFRESH_DATA) {
                getProfiles()
            }
        })
    }, [])

    const getData = async () => {

        if (profiles.length > 0) {
            downloadExcel("Profiles", ["Profile Url", "Thumbnail", "Tagline", "Location", "Username", "Picture Url", "First Name", "Last Name", "Email", "Phone", "Websites", "Address", "Current Company", "Current Designation"], profiles)
            toast.success("Downloading file!", { autoClose: 2000, })

            if (auth.currentUser?.email) {
                await setUserQuota(auth.currentUser?.email, withEmails.length)
            }
        }
        else {
            toast.info("Please run finder to download!", { autoClose: 2000, })
            setCurrentScreen("scrapper")
        }
    }


    return (
        <Box>
            {
                status == SCRAPING_STATUS.COLLECTING_PROFILES_COMPLETE_DATA || status == SCRAPING_STATUS.COLLECTING_PROFILES_PARTIAL_DATA ? <ProgressCard /> : null
            }
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gridGap: 30 }}>
                <Box sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 125px)",
                    justifyContent: "space-between",
                    textAlign: "center",
                }}>
                    <ExportCard count={profiles.length} text='Profiles scanned' />
                    <ExportCard count={profilesScrapped.length} text='Profiles scrapped' />
                    <ExportCard count={withEmails.length} text='Emails found' />
                </Box>
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                    {
                        (status == SCRAPING_STATUS.READY_FOR_DOWNLOAD || status == SCRAPING_STATUS.IDLE) && profiles.length > 0 ? <Button onClick={getData} variant='contained' color='info'>Download</Button> : null
                    }
                    {
                        (status == SCRAPING_STATUS.COLLECTING_PROFILES_COMPLETE_DATA || status == SCRAPING_STATUS.COLLECTING_PROFILES_PARTIAL_DATA) ? <Button onClick={okClickHandle} variant='contained'>Stop</Button> : null
                    }
                </Box>
            </Box >

        </Box>
    );
}

export default ExportPage;

