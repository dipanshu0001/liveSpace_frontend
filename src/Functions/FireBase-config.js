// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAipE2U197BBmdu-vzE6I6qVkNdsb3fH5Q",
  authDomain: "livespace-2.firebaseapp.com",
  projectId: "livespace-2",
  storageBucket: "livespace-2.appspot.com",
  messagingSenderId: "359678660322",
  appId: "1:359678660322:web:df6efd84416f39945298bb",
  measurementId: "G-002HG6XPGW"
  
}

export const app = initializeApp(firebaseConfig );
export const auth=getAuth(app);
export const database=getFirestore(app);



