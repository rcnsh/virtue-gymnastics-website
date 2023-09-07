import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCIze6Z4ERj3_0_u0psJa8TEZh0CwhcGa0',
  authDomain: 'virtue-movement.firebaseapp.com',
  projectId: 'virtue-movement',
  storageBucket: 'virtue-movement.appspot.com',
  messagingSenderId: '785367617909',
  appId: '1:785367617909:web:81cbe4eeff759ff4e2c33c',
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
