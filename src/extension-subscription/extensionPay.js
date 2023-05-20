import ExtPay from 'ExtPay'
class ExtensionPay {
  constructor(projectName) {
    this.extpay = ExtPay(projectName)
  }
  async ifUserPaid() {
    const user = await this.extpay.getUser()
    return user.paid
  }

  async openPaymentPage() {
    await this.extpay.openPaymentPage()
  }

  async onPaid(cb) {
    await this.extpay.onPaid.addListener(cb)
  }

  async onTrialStarted(cb) {
    await this.extpay.onTrialStarted.addListener(cb)
  }

  async getUser() {
    return await this.extpay.getUser()
  }

  async startBackground() {
    await this.extpay.startBackground()
  }

  async openTrialPage() {
    return await this.extpay.openTrialPage()
  }

  async openLoginPage() {
    return await this.extpay.openLoginPage()
  }
}

export { ExtensionPay }
