// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoGQrq4aGx5BhicudqJpsvmFiq-71jc0M",
  authDomain: "carseat-gift.firebaseapp.com",
  databaseURL:
    "https://carseat-gift-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "carseat-gift",
  storageBucket: "carseat-gift.firebasestorage.app",
  messagingSenderId: "828386818711",
  appId: "1:828386818711:web:f50d54f0666d771a1487d2",
};

// Initialize Firebase
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getDatabase(app);
