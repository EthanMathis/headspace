import firebase from "firebase/app";
import 'firebase/storage'
import 'firebase/firestore'


  export const firebaseConfig = {
    apiKey: "AIzaSyDMmX_m1U4oYBxbQWghrrO7b_rTXJwK3mA",
    authDomain: "headspace-4f95d.firebaseapp.com",
    projectId: "headspace-4f95d",
    storageBucket: "gs://headspace-4f95d.appspot.com/",
    messagingSenderId: "650173702211",
    appId: "1:650173702211:web:75c83bbb7d79a97a9234f6"
  };

  firebase.initializeApp(firebaseConfig)

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  export { projectStorage, projectFirestore, timestamp }