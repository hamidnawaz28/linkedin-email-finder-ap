import Browser from 'webextension-polyfill'
import { setLocalStorage } from '../common/browserMethods'
import { MESSAGING, SCRAPING_STATUS } from '../common/constants'
import {
  addProfiles,
  changeStatus,
  getAllData,
  getAllProfiles,
  getPagesToScrap,
  initializeDataBase,
  startCompleteDataCollection,
  updateAProfile,
  updatePageToScrap,
} from '../common/services'

Browser.runtime.onMessage.addListener(async (request, tabInfo) => {
  const { message, data } = request
  const { tab } = tabInfo
  const tabId = tab?.id || 0

  const responseObj = {
    [MESSAGING.INITIALIZE_DATA]: async () => await initializeDataBase(),
    [MESSAGING.CHANGE_STATUS]: async () => await changeStatus(data.status),
    [MESSAGING.ADD_PROFILES]: async () => await addProfiles(data.profiles),
    [MESSAGING.UPDATE_A_PROFILE]: async () => await updateAProfile(data.profileUrl, data.profile),
    [MESSAGING.GET_ALL_PROFILES]: async () => await getAllProfiles(),
    [MESSAGING.GET_ALL_DATA]: async () => await getAllData(),
    [MESSAGING.UPDATE_PAGES_TO_SCRAP]: async () => await updatePageToScrap(data.pagesToScrap),
    [MESSAGING.GET_PAGES_TO_SCRAP]: async () => await getPagesToScrap(),
    [MESSAGING.START_COMPLETE_PROFILES_DATA_COLLECTION]: async () =>
      await startCompleteDataCollection(tabId),
  }
  const response = (await responseObj?.[message]?.()) || false
  return response
})

Browser.runtime.onInstalled.addListener(async () => {
  await setLocalStorage({ status: SCRAPING_STATUS.IDLE, profiles: [], user: {} })
})
