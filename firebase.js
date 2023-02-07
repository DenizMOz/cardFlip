import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfigArr = [import.meta.env.VITE_FIREBASE_API_KEY, 'flipcard-storage.firebaseapp.com', 'flipcard-storage', 'flipcard-storage.appspot.com', import.meta.env.VITE_FIREBASE_SENDER_ID, import.meta.env.VITE_FIREBASE_APP_ID];
//The above array is used to create the firebaseConfig object below
const firebaseConfig = {
    apiKey: firebaseConfigArr[0],
    authDomain: firebaseConfigArr[1],
    projectId: firebaseConfigArr[2],
    storageBucket: firebaseConfigArr[3],
    messagingSenderId: firebaseConfigArr[4],
    appId: firebaseConfigArr[5]
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
