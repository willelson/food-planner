import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDyf1DzIzh_3Gz9liDz1N6uo51RJtSLcsc',
  authDomain: 'food-planner-2143c.firebaseapp.com',
  projectId: 'food-planner-2143c',
  storageBucket: 'food-planner-2143c.appspot.com',
  messagingSenderId: '836660591038',
  appId: '1:836660591038:web:1631a38693f8ced8fc21ef',
  measurementId: 'G-NZCDGMSHGQ'
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();

//export the auth object
export { auth };
