import {
  getLocalStorage,
  getSyncStorage,
  MessagingMethods,
  OtherBrowerMethods,
  setLocalStorage,
  setSyncStorage,
} from './browserMethods'
import { MESSAGING, SCRAPING_STATUS } from './constants'
import { asyncSleep } from './utils'

const { tabMesageWithId, runTimeMessage } = new MessagingMethods()
const { updateATabUrl, waitTillTabLoads } = new OtherBrowerMethods()

const addProfiles = async (profiles: any) => {
  const localData = await getLocalStorage()
  const updatedData = { ...localData, profiles: [...localData.profiles, ...profiles] }
  await setLocalStorage(updatedData)
}

const updateAProfile = async (profileUrl: any, data: any) => {
  const localData = await getLocalStorage()
  const updatedProfiles = localData.profiles.map((profile: any) => {
    if (profile.profileUrl == profileUrl) {
      return {
        ...profile,
        profileUrl,
        scrapped: true,
        ...data,
      }
    } else return profile
  })
  const updatedData = {
    ...localData,
    profiles: updatedProfiles,
  }
  await setLocalStorage(updatedData)
}

const getAllProfiles = async () => {
  const localData = await getLocalStorage()
  return localData.profiles
}

const getAProfile = async (profileUrl: string) => {
  const localData = await getLocalStorage()
  const allProfiles = localData.profiles
  return allProfiles.find((profile: any) => profile.profileUrl == profileUrl)
}

const getAllData = async () => {
  const localData = await getLocalStorage()
  return localData
}

const updatePageToScrap = async (pagesToScrap: number) => {
  await setSyncStorage({
    pagesToScrap,
  })
}

const getPagesToScrap = async () => {
  const syncData = await getSyncStorage()
  return syncData.pagesToScrap
}

const initializeDataBase = async () => {
  const allData = await getAllData()
  await setLocalStorage({ ...allData, status: SCRAPING_STATUS.IDLE, profiles: [], user: {} })
}

const changeStatus = async (status: string) => {
  const allData = await getAllData()
  await setLocalStorage({ ...allData, status: status })
}

const updateLocalData = async (data: any) => {
  const allData = await getAllData()
  await setLocalStorage({ ...allData, ...data })
}

const startCompleteDataCollection = async (tabId: number) => {
  const allProfiles = await getAllProfiles()
  for (const profile of allProfiles) {
    const data = await getAllData()
    if (data.status == SCRAPING_STATUS.IDLE) break
    updateATabUrl(tabId, profile.profileUrl)
    await asyncSleep(20)

    await waitTillTabLoads(tabId)
    await tabMesageWithId(tabId || 0, {
      message: MESSAGING.COLLECT_A_PROFILE_DATA,
      data: {
        profileUrl: profile.profileUrl,
      },
    })

    const allData = await getAllProfiles()
    const matchedProfile = allData.find(
      (newProfileData: any) => newProfileData.profileUrl == profile.profileUrl,
    )
     
    if(matchedProfile!=-1 && matchedProfile.email=='NOT_FOUND' && matchedProfile.currentCompany!='NOT_FOUND'){
      const dbEmailData:any = await getEmailFromDb(matchedProfile.profileUrl)
      if(dbEmailData){
        await updateAProfile(profile.profileUrl, {email:dbEmailData.email})
        return 
      }
      updateATabUrl(tabId, `${matchedProfile.currentCompany}about`)
      await asyncSleep(20)
      await waitTillTabLoads(tabId)
      await tabMesageWithId(tabId || 0, {
        message: MESSAGING.COLLECT_EMAILS_FROM_COMPANY_DATA,
        data: {
          profileUrl: profile.profileUrl,
        },
      })
    }
    const allDataAfterEmailScrap = await getAllProfiles()
    const matchedProfileAfterEmailScrap = allDataAfterEmailScrap.find(
      (newProfileData: any) => newProfileData.profileUrl == profile.profileUrl,
    )
    if(matchedProfileAfterEmailScrap.email!='NOT_FOUND'){
      await saveProfileEmail(matchedProfileAfterEmailScrap.profileUrl,matchedProfileAfterEmailScrap.email )
    }
  }

 
  await changeStatus(SCRAPING_STATUS.READY_FOR_DOWNLOAD)
  await runTimeMessage({ message: MESSAGING.FETCH_REFRESH_DATA })
}
const saveProfileEmail=async(linkedinUserName:string,email:string)=>{
  console.log('Saved linkedin profile');
}

const getEmailFromDb=async(linkedinUserName:string)=>{

}
export {
  getAProfile,
  addProfiles,
  updatePageToScrap,
  getPagesToScrap,
  getAllProfiles,
  updateAProfile,
  initializeDataBase,
  startCompleteDataCollection,
  getAllData,
  changeStatus,
  updateLocalData,
}
