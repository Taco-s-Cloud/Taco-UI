import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCE0OOyqDl0AYdssaVqQ4qM9SEFPouDG5w",
    authDomain: "cloud-computing-439018.firebaseapp.com",
    projectId: "cloud-computing-439018",
    storageBucket: "cloud-computing-439018.firebasestorage.app",
    messagingSenderId: "1024364663505",
    appId: "1:1024364663505:web:b86b08a0811919955a6bf0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
