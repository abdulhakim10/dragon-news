import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../../firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('state changed', currentUser);
           if(currentUser === null || currentUser.emailVerified){
            setUser(currentUser);
           }
            setLoading(false);
        })

        return () => {
            unSubscribe();
        }

    }, [])

    // function for create user
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // function for user profile update
    const userProfileUpdate = profile => {
        return updateProfile(auth.currentUser, profile);
    }

    // function for email verification
    const verifyEmail = () => {
        return sendEmailVerification(auth.currentUser);
    }

    // function for sign in with email and password
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    // function for sign in with pop up
    const providerLogin = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider);
    }

    // function for sign out
    const logOut = () => {
        setLoading(true)
        return signOut(auth);
    }

    const authInfo = {
        user,
        loading,
        setLoading,
        createUser,
        userProfileUpdate,
        verifyEmail,
        providerLogin,
        logOut,
        signIn
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;