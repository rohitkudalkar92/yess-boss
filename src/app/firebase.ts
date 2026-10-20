import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDUl3ph7AodXvt_DbhKp2F2XHKx4TDA3Xo',
  authDomain: 'yess-boss-9b582.firebaseapp.com',
  projectId: 'yess-boss-9b582',
  storageBucket: 'yess-boss-9b582.firebasestorage.app',
  messagingSenderId: '480329343015',
  appId: '1:480329343015:web:3e8e43799b635a34582e02',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
