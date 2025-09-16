// Firebase initialization
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCeeoZ2bd56vcfkyU1fPtN9Oe46U4qJPGc',
  authDomain: 'skillroute-1c12a.firebaseapp.com',
  projectId: 'skillroute-1c12a',
  storageBucket: 'skillroute-1c12a.firebasestorage.app',
  messagingSenderId: '61181846018',
  appId: '1:61181846018:web:2e75225f977ade81ca7d1b',
  measurementId: 'G-CWY4L5BMC9'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export async function googlePopup(){
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const idToken = await user.getIdToken();
  return { idToken, user };
}
