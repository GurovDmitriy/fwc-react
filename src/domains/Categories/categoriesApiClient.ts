import { collection, getDocs } from "firebase/firestore"
import { db } from "../../../firebase"

export const categoriesApiClient = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "categories"))
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.log(error)
  }
}
