import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import { AuthContext } from '../AuthContext/AuthContext';

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
    const signInWithGoogle = () => {
        return signInWithPopup(auth, provider);
    };

    const signOutUser = ()=>{
        return signOut(auth);
    }
    // onAuthStateChanged(auth, (currentUser) => {
    //     if (currentUser) {
    //         console.log(currentUser);
    //     } else {
    //         console.log(currentUser);
    //     }
    // })
    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
        console.log(currentUser);
        setUser(currentUser);
        setLoading(false)
        })

        return () => {
            unsubscribe();
        }
    },[])

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signInWithGoogle,
        signOutUser
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
