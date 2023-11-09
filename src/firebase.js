import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBvbh0ip-nAU7XXS4nz4JaW3bUNzixn1yg",
    authDomain: "shopping-40c59.firebaseapp.com",
    projectId: "shopping-40c59",
    storageBucket: "shopping-40c59.appspot.com",
    messagingSenderId: "634942384420",
    appId: "1:634942384420:web:a3bd1a0c299e267d136bb1",
    measurementId: "G-NS06GCRPYW"
};

// Firebase 초기화
const firebaseApp = initializeApp(firebaseConfig);

// 필요한 Firebase 서비스 가져오기
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

export { auth, database };