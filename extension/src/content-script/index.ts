import Browser from 'webextension-polyfill'
import { MessagingMethods } from '../common/browserMethods'
import { MESSAGING, SCRAPING_STATUS } from '../common/constants'
import { getAllData, getAProfile,initializeDataBase,changeStatus,addProfiles } from '../common/services'
import { allCollectedEmails, asyncSleep } from '../common/utils'
 
const { runTimeMessage } = new MessagingMethods()

const refreshPopupData = async()=>await runTimeMessage({ message: MESSAGING.FETCH_REFRESH_DATA })

// Data partial data of profiles
const scrapPartialProfilesData = async (pagesToScrap: number) => {
  await initializeDataBase()
  await changeStatus(SCRAPING_STATUS.COLLECTING_PROFILES_PARTIAL_DATA)
  await refreshPopupData()
  const pages = pagesToScrap || 0

  for (let index = 0; index < pages; index++) {
    const data = await getAllData()
    if (data.status == SCRAPING_STATUS.IDLE) break

    await asyncSleep(5)
    const profiles = Array.from(
      document.querySelectorAll('.reusable-search__result-container'),
    ) as HTMLElement[]

    const allProfiles = profiles.map((profi: any) => {
      const url = new URL(profi.querySelector('.entity-result__title-text .app-aware-link').href)
      const completeUrl = url.origin + url.pathname
      const paths = url.pathname.split('/')

      const thumbnail = profi.querySelector('.presence-entity__image')?.getAttribute('src') || ''
      const tagline =
        profi.querySelector('.linked-area .entity-result__primary-subtitle')?.innerText || ''
      const location =
        profi.querySelector('.linked-area .entity-result__secondary-subtitle')?.innerText || ''
      return {
        profileUrl: completeUrl,
        username: paths[paths.length - 1],
        scrapped: false,
        thumbnail,
        tagline,
        location,
      }
    })

    await addProfiles(allProfiles)
    const nextPageRef = document.querySelector(
      '.artdeco-pagination__indicator.active + li',
    ) as HTMLElement

    await refreshPopupData()
    if (!nextPageRef || index == pages - 1) break
    const nextButtonRef = nextPageRef.querySelector('button') as HTMLElement
    nextButtonRef.click()
    await asyncSleep(1)
  }

  await refreshPopupData()
  await changeStatus(SCRAPING_STATUS.COLLECTING_PROFILES_COMPLETE_DATA)
   
  const data = await getAllData()
  if (data.status !== SCRAPING_STATUS.IDLE) {
    await runTimeMessage({ message: MESSAGING.START_COMPLETE_PROFILES_DATA_COLLECTION })
  }
}

// Data complete data of a profile
const scrapACompleteProfileData = async (profileUrl: string) => {
  await asyncSleep(4)

  const picRef = document.querySelector('.pv-top-card-profile-picture__image') as HTMLElement
  const name = picRef.getAttribute('title')

  const detailsPopupRef = document.querySelector(
    '#top-card-text-details-contact-info',
  ) as HTMLElement
  const currentCompanyRef = document.querySelector(
    "[data-field='experience_company_logo']",
  ) as HTMLElement

  const currentDesignationRef = document
    ?.querySelector("[data-field='experience_company_logo']")
    ?.parentNode?.parentNode?.querySelector('div:nth-child(2)>div>div>div>span>span') as HTMLElement

  detailsPopupRef.click()
  await asyncSleep(2)

  // const profileUrlRef = document.querySelector(
  //   '.pv-contact-info__contact-type.ci-vanity-url .pv-contact-info__ci-container a',
  // ) as HTMLElement
  const emailRef = document.querySelector(
    '.pv-contact-info__contact-type.ci-email .pv-contact-info__contact-link',
  ) as HTMLElement
  const mobileRef = document.querySelector(
    '.pv-contact-info__contact-type.ci-phone .pv-contact-info__ci-container>span:nth-child(1)',
  ) as HTMLElement
  const addressRef = document.querySelector(
    '.pv-contact-info__contact-type.ci-address .pv-contact-info__ci-container',
  ) as HTMLElement

  const websites = Array.from(
    document.querySelectorAll('.pv-contact-info__contact-type.ci-websites ul>li'),
  )
    .map((el: any) => el?.innerText || '')
    .join('\n')

  const splitName = name?.split(' ') || []
  const firstName = splitName.length < 1 ? 'NOT_FOUND' : splitName[0]
  const lastName = splitName.length <= 1 ? 'NOT_FOUND' : splitName[splitName.length - 1]

  const profileData = {
    pictureUrl: picRef?.getAttribute('src') || 'NOT_FOUND',
    firstName: firstName,
    lastName: lastName,
    email: emailRef?.innerText || 'NOT_FOUND',
    number: mobileRef?.innerText || 'NOT_FOUND',
    address: addressRef?.innerText || 'NOT_FOUND',
    websites: websites,
    currentCompany: currentCompanyRef?.getAttribute('href') || 'NOT_FOUND',
    currentDesignation: currentDesignationRef?.innerText || 'NOT_FOUND',
    scrapped: true,
  }
debugger
  const closeButtonRef = document.querySelector('.artdeco-modal__dismiss') as HTMLElement
  closeButtonRef.click()

  await runTimeMessage({
    message: MESSAGING.UPDATE_A_PROFILE,
    data: { profileUrl, profile: profileData },
  })

  await asyncSleep(1)
  await refreshPopupData()
}

const scrapEmailsFromCompanyData = async (profileUrl: string) => {
  const companyDomainRef = document.querySelector('dl dd') as HTMLElement
  const companyDomainText = companyDomainRef.innerText
  const subDomain = new URL(companyDomainText).host.replace('www.', '')
  const profileData = await getAProfile(profileUrl)
  const emails = await allCollectedEmails(subDomain, profileData.firstName, profileData.lastName)

  await runTimeMessage({
    message: MESSAGING.UPDATE_A_PROFILE,
    data: {
      profileUrl,
      profile: { email: emails, website: companyDomainText, subDomain },
    },
  })
  await asyncSleep(1)
  await refreshPopupData()
}

const contentScript = () => {
  Browser.runtime.onMessage.addListener(async function (request, tabInfo) {
    const { message, data } = request
    const { tab } = tabInfo
    const tabId = tab?.id || 0

    if (message === MESSAGING.START_PARTIAL_PROFILES_DATA_COLLECTION) {
      const { pagesToScrap } = data
      await scrapPartialProfilesData(pagesToScrap)
    } else if (message === MESSAGING.COLLECT_A_PROFILE_DATA) {
      const { profileUrl } = data
      await scrapACompleteProfileData(profileUrl)
    } else if (message === MESSAGING.COLLECT_EMAILS_FROM_COMPANY_DATA) {
      const { profileUrl } = data
      await scrapEmailsFromCompanyData(profileUrl)
    } else if (message === MESSAGING.GET_PAGE_URL_CONTENT) {
      return window.location.href
    }
  })
}

contentScript()
