import * as firebase from 'firebase';
import "firebase/firestore";

try{
    const firebaseConfig = {
        apiKey: "AIzaSyCaZhTD1MZEREJaZrkL3nJQRO4jbpeNV2U",
        authDomain: "cargame-transporte-001.firebaseapp.com",
        databaseURL: "https://cargame-transporte-001.firebaseio.com",
        projectId: "cargame-transporte-001",
        storageBucket: "cargame-transporte-001.appspot.com",
        messagingSenderId: "663678344176",
        appId: "1:663678344176:web:0f33caa07e889655c91b35",
        measurementId: "G-F09SEVJES3"
    };
    
    firebase.initializeApp(firebaseConfig);
} catch (err){
}
export const firestoreDB = firebase.firestore();