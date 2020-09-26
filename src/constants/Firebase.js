import firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth";
import ENV from '../../env';

try {
  const firebaseConfig = {
    apiKey: ENV.firebaseApiKey,
    authDomain: "cargamedb-p1.firebaseapp.com",
    databaseURL: "https://cargamedb-p1.firebaseio.com",
    projectId: "cargamedb-p1",
    storageBucket: "cargamedb-p1.appspot.com",
    messagingSenderId: "950532818245",
    appId: "1:950532818245:web:f583866904f66124bd2a2c",
    measurementId: "G-WJ6SMF3D9Y"
  };

  firebase.initializeApp(firebaseConfig);
} catch (err) {
}
export const firebaseAuth = firebase.auth();
export const firestoreDB = firebase.firestore();