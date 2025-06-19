import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQz2S69XNYeROk5wZ1ipYZUz6x6ESvYhw",
  authDomain: "printxcelerate-24b9f.firebaseapp.com",
  projectId: "printxcelerate-24b9f",
  storageBucket: "printxcelerate-24b9f.appspot.com",
  messagingSenderId: "675891197065",
  appId: "1:675891197065:web:339296d128600eb7054258",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };