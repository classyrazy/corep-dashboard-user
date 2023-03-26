// import { useRuntimeConfig } from "nuxt/app";
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js');


// const config = useRuntimeConfig()

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc9505Nnx05JJoPgl_Yr41sB1WskyzZvs",
  authDomain: "corep-9ee55.firebaseapp.com",
  projectId: "corep-9ee55",
  storageBucket: "corep-9ee55.appspot.com",
  messagingSenderId: "146325668873",
  appId: "1:146325668873:web:e1e5ed07b537e7c71f24d8",
  measurementId: "G-J31C55145C",
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
console.log('[firebase-messaging-sw.js] Received background message ', payload);
const notificationTitle = payload.notification.title;
const notificationOptions = {
body: payload.notification.body,
};
return self.registration.showNotification(notificationTitle,
notificationOptions);
});
// self.addEventListener('notificationclick', event => {
//    console.log(event)
// });