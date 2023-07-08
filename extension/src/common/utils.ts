import * as xlsx from 'xlsx'
import { verifyEmail,} from '../firebase/api'
 
function downloadExcel(sheetName: string, sheetHeader: string[], sheetData: any) {
  // Create a workbook with a single worksheet
  const workbook = xlsx.utils.book_new()
  const worksheet = xlsx.utils.aoa_to_sheet([sheetHeader, ...sheetData])
  xlsx.utils.book_append_sheet(workbook, worksheet, sheetName)

  const wbout = xlsx.write(workbook, { type: 'binary', bookType: 'xlsx' })
  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${sheetName}.xlsx`
  a.click()
  URL.revokeObjectURL(url)
}

function s2ab(s: string) {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xff
  }
  return buf
}

function asyncSleep(sec: any) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000))
}

function downloadCSV(sheetName: string, sheetHeader: string[], sheetData: any) {
  const workbook = xlsx.read([sheetHeader, [...sheetData]], { type: 'binary' })
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]
  const csv = xlsx.utils.sheet_to_csv(worksheet)

  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = sheetName
  link.click()
  URL.revokeObjectURL(url)
}

export function csvJSON(csv: any) {
  const lines = csv.split('\n')
  const result = []
  const headers = lines[0].split(',')

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue
    const obj: any = {}
    const currentline = lines[i].split(',')

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j]
    }
    result.push(obj)
  }
  return result
}

const potentialOtherEmailCombination = (domain = '', firstName = '', lastName = '') => {
  const firstInitial = firstName.charAt(0)
  const lastInitial = lastName.charAt(0)

  const allCombinations = [
    firstName,
    `${firstName}${lastInitial}`,
    `${firstName}.${lastInitial}`,
    `${lastInitial}${firstName}`,
    `${lastInitial}.${firstName}`,
    `${firstName}_${lastName}`,
    `${firstName}_${lastInitial}`,
    `${lastInitial}_${firstName}`,
    `${firstName}${lastName}`,
    lastName,
    `${firstInitial}.${lastName}`,
    `${firstInitial}${lastInitial}`,
    `${firstInitial}.${lastInitial}`,
    `${lastName}${firstName}`,
    `${lastName}.${firstName}`,
    `${lastName}${firstInitial}`,
    `${lastName}.${firstInitial}`,
    `${lastInitial}${firstInitial}`,
    `${lastInitial}.${firstInitial}`,
    `${firstInitial}_${lastName}`,
    `${firstInitial}_${lastInitial}`,
    `${lastName}_${firstName}`,
    `${lastName}_${firstInitial}`,
    `${lastInitial}_${firstInitial}`,
  ]

  const allEmails = allCombinations.map((el) => `${el}@${domain}`)
  return allEmails
}

const allCollectedEmails = async (domain = '', firstName = '', lastName = '') => {
  
  const firstAttemptEmail= `${firstName}.${lastName}@${domain}`
  const firstAttemptEmailResult = await verifyEmail(firstAttemptEmail)
  if(firstAttemptEmailResult) return firstAttemptEmail
  else{
    const secondAttemptEmail= `${firstName?.charAt(0)}${lastName}@${domain}`
    const secondAttemptEmailResult = await verifyEmail(secondAttemptEmail)
    if(secondAttemptEmailResult) return secondAttemptEmail
    else {
      const otherEmailCombinations = potentialOtherEmailCombination(domain, firstName, lastName)
      
      const allRequests = otherEmailCombinations.map(email=>verifyEmail(email))
      const emailResults = await Promise.all(allRequests);
       const emailFoundIndex = emailResults.findIndex((request:boolean)=>request==true)
       if(emailFoundIndex!=-1) return otherEmailCombinations[emailFoundIndex]
      return 'NOT_FOUND'
    }
  }
  
}
export { potentialOtherEmailCombination, downloadExcel, downloadCSV, asyncSleep, allCollectedEmails }
