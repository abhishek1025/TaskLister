// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    onSnapshot,
    getDocs
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCmFEQgCKENfcL33YfeeTtfYxa66OS_M6g",
    authDomain: "tasklister-f4163.firebaseapp.com",
    projectId: "tasklister-f4163",
    storageBucket: "tasklister-f4163.appspot.com",
    messagingSenderId: "898576563662",
    appId: "1:898576563662:web:91a50b316c93cc78153f9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    propmt: 'select_account'
})

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);


export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

    if (!userAuth) return;

    //seting up doc name for database
    const userDocRef = doc(db, 'users', userAuth.uid);
    // console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef)
    // console.log(userSnapshot);
    // console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.error('error creating the user', error.message)
        }
    }
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);

}

export const signAuthUserWithEmailAndPassword = async (email, password) => {

    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);

}

export const signOutUser = () => signOut(auth);

export const onAuthChangedListener = (callback) => onAuthStateChanged(auth, callback);


export const getUserDetails = async (userDetails, storeUserDataInStore) => {
    try {
        const docRef = doc(db, "users", userDetails.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.data()) return;

        const { displayName } = docSnap.data();

        storeUserDataInStore({ ...userDetails, displayName });
    }
    catch (e) {
        console.log(e)
    }

}

export const db = getFirestore();

export const storeDataInFirebase = async (uid, tasks) => {

    await setDoc(doc(db, "user-tasks", uid), { tasks });
}

export const getDataFromFirebase = async (uid, setDataInReduxStore) => {
    const docSnap = await getDoc(doc(db, "user-tasks", uid));

    if (!docSnap.data()) return;

    const { tasks } = docSnap.data();

    setDataInReduxStore(tasks);
}