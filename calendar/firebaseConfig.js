import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: '',
  authDomain: 'nisatakvim.firebaseapp.com',
  databaseURL:
    'https://nisatakvim-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'nisatakvim',
  storageBucket: 'nisatakvim.appspot.com',
  messagingSenderId: '865413670722',
  appId: '1:865413670722:web:b25bc12d262073622d0adb',
  measurementId: 'G-GV87KGB8ZF',
};

const firebaseApp = initializeApp(firebaseConfig);

const firebasedatabase = getDatabase(firebaseApp);

const firebaseAuth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const Firebase = {
  app: firebaseApp,
  auth: firebaseAuth,
  database: firebasedatabase,
};

export default Firebase;
