import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged  } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

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
const storage = getStorage(firebaseApp);

// 이거 없으니까 undefiend 읽을 수 없다고 뜸 (getProvider)
onAuthStateChanged(auth, (user) => {
    if (user) {
        // 사용자가 로그인한 상태
        console.log('User is signed in');
    } else {
        // 사용자가 로그아웃한 상태
        console.log('User is signed out');
    }
});

export { auth, database, storage };