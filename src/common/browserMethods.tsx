import Browser from "webextension-polyfill";
import { asyncSleep } from "./utils";
const syncRef = Browser.storage.sync;
const localRef = Browser.storage.local;

const STORE_NAME = "linkedin_scrapper"

async function setSyncStorage(data: any) {
    await syncRef.set({ [STORE_NAME]: data });
}

async function setLocalStorage(data: any) {
    await localRef.set({ [STORE_NAME]: data });
}

async function getSyncStorage() {
    const data = await syncRef.get();
    return data[STORE_NAME];
}

async function getLocalStorage() {
    const data = await localRef.get();
    return data[STORE_NAME];
}

class MessagingMethods {
    // Send message from popup and options popup to content script and background script
    async tabMesage(data: any) {
        const tabsData: any = await Browser.tabs.query({
            active: true,
            currentWindow: true,

        });
        return await Browser.tabs.sendMessage(tabsData[0].id, { ...data });
    }
    async tabMesageWithId(tabId: number, data: any) {
        return await Browser.tabs.sendMessage(tabId, { ...data });
    }
    // Send message for any other scenerio except the above one
    async runTimeMessage(data: any) {
        return await Browser.runtime.sendMessage(data);
    }
}

class OtherBrowerMethods {

    async reloadATab(tabId: number) {
        await Browser.tabs.reload(tabId);
    }
    async createATab(url: string) {
        return await Browser.tabs.create({ url })
    }
    async updateATabUrl(tabId: number, url: string) {
        return await Browser.tabs.update({ url })
    }

    async activeTab() {

        const tabsData: any = await Browser.tabs.query({
            active: true,
        })
        return tabsData[0]
    }

    async waitTillTabLoads(tabId: number) {
        await asyncSleep(0.5)
        const tab = await Browser.tabs.get(tabId)

        if (tab.status == 'loading') {
            await this.waitTillTabLoads(tabId)
        } else return
    }

    async displayBadgeOnATab(iconText: string, tabId: number) {
        await Browser.action.setBadgeText({
            text: iconText,
            tabId,
        });
    }
}




export { setLocalStorage, getLocalStorage, setSyncStorage, getSyncStorage, MessagingMethods, OtherBrowerMethods };
