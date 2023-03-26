// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const config = useRuntimeConfig()

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: config.VITE_FIREBASE_API_KEY as string,
  authDomain: config.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: config.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: config.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: config.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: config.VITE_FIREBASE_APP_ID as string,
  measurementId: config.VITE_FIREBASE_MEASUREMENT_ID as string,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);

// Add the public key generated from the console here.
// export const token =  getToken(messaging, {vapidKey:import.meta.env.VITE_FIREBASE_VAPID_KEY as string});