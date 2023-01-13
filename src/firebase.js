// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, collection, doc, addDoc, setDoc, deleteDoc, getDocs, query, where, onSnapshot } from "firebase/firestore";
import { getStorage, ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export const loginWithGoogle = async () => {
  try {
    const { user } = await signInWithPopup(auth, provider) 
    return user
  } catch (error) {
    console.error(error)
  }
}

export const logout = async () => {
  await signOut(auth)
}

export const addInventoryItem = async (data) => {
  try {
    const { title, group, category, file, targetUrl } = data
   
    const docRef = await addDoc(collection(db, "inventory"), {});
    
    const storageRef = ref(storage, `inventory/${docRef.id}/${file.name}`);
    await uploadBytes(storageRef, file) 

    await setDoc(docRef, {
      title,
      group,
      category,
      imgUrl: await getDownloadURL(storageRef),
      targetUrl
    })
    
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const getInventoryItems = (group, callback) => { 

  const q = query(collection(db, "inventory"), where("group", "==", group));

  return onSnapshot(q, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    callback(data)
  });

}

export const deleteInventoryItem = async (item) => {
  try {
    const storageRef = ref(storage, item.imgUrl);
    await deleteObject(storageRef)
    await deleteDoc(doc(db, "inventory/" + item.id));
  } catch (error) {
    console.error(error)
  }
}

export const updateInventoryItem = async (item, updateData) => {
  try {
    const { title, group, category, file, targetUrl } = updateData

    let imgUrl = item.imgUrl

    if (file) {
      const oldStorageRef = ref(storage, item.imgUrl);
      await deleteObject(oldStorageRef)

      const storageRef = ref(storage, `inventory/${item.id}/${file.name}`);
      await uploadBytes(storageRef, file)

      imgUrl = await getDownloadURL(storageRef)
    }
   
    await setDoc(doc(db, "inventory/" + item.id), {
      title,
      group,
      category,
      imgUrl,
      targetUrl
    });

  } catch (error) {
    console.error(error)
  }
}