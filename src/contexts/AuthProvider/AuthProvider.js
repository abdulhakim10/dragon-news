import React, { createContext, useEffect, useState } from 'react';
import {getAuth, onAuthStateChanged, signInWithPopup} from 'firebase/auth';
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

    const providerLogin = (provider) => {
        return signInWithPopup(auth, provider);
    }

    const authInfo = {user, providerLogin};

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;