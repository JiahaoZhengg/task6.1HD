import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAfLEJRjItBB4Wx5vnj2MPun3Q8INV8gOk",
  authDomain: "task7-d1a0a.firebaseapp.com",
  projectId: "task7-d1a0a",
  storageBucket: "task7-d1a0a.appspot.com",
  messagingSenderId: "695358624286",
  appId: "1:695358624286:web:15015a0f3ecfaea18a540f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth();

export const createUserDocFromAuth = async (userAuth, additional = {}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        ...additional
      })
    }
    catch (error) {
      alert('error in creating', error.message);
    }
  }
  return userDocRef;
}

export const emailandpass = async (email, password) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(auth, email, password)
}

export const signemailandpass = async (email, password) => {
  if (!email || !password) return;
  return signInWithEmailAndPassword(auth, email, password)
}