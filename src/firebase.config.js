import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAe2iwFvq1qEcmrYLFmoH7Nbs8UivS73yo',
  authDomain: 'house-marketplace-app-3b437.firebaseapp.com',
  projectId: 'house-marketplace-app-3b437',
  storageBucket: 'house-marketplace-app-3b437.appspot.com',
  messagingSenderId: '207158933891',
  appId: '1:207158933891:web:582ec9a0e54f6ba89e9eb6',
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
