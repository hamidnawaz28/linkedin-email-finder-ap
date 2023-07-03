import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { firestore } from './apps'

const addADoc = async (collection: string, id: string, data: any) => {
  await setDoc(doc(firestore, collection, id), data)
  return id
}

const editADoc = async (collection: string, documentId: string, data: any) => {
  await setDoc(doc(firestore, collection, documentId), data)
}

const getADoc = async (collection: string, documentId: string) => {
  const docSnap = await getDoc(doc(firestore, collection, documentId))
  if (docSnap.exists()) {
    return { success: true, data: docSnap.data() }
  } else {
    return { success: false, data: {}, message: 'missing data!' }
  }
}

const getUserData = async (key: string, value: string) => {
  const usersRef = collection(firestore, 'users')
  const q = query(usersRef, where(key, '==', value))
  const querySnapshot = await getDocs(q)
  const resp: any = []
  querySnapshot.forEach((doc: any) => {
    resp.push(doc.data())
  })

  return resp
}

export { addADoc, editADoc, getADoc, getUserData }
