import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import app from '../../firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
       const unSubscribe = onAuthStateChanged(auth, currentUser => {
        console.log('state changed', currentUser);
        setUser(currentUser);
       })

       return () =>{
        unSubscribe();
       }

    },[])

    // function for create user
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // function for sign in with email and password
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // function for sign in
    const providerLogin = (provider) => {
        return signInWithPopup(auth, provider);
    }

    // function for sign out
    const logOut = () => {
        return signOut(auth);
    }

    const authInfo = {user, providerLogin, logOut, createUser, signIn};

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;