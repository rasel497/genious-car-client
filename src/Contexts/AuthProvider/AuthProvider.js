import React, { createContext, useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";
import app from '../../firebase/firebase.config';


export const AuthContext = createContext();
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // createUserWithEmailAndPassword:
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //logOut
    const logOut = () => {
        localStorage.removeItem('genius-token');
        return signOut(auth);
    }

    // signInWithEmailAndPassword:
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // using for Create User AND Sign In user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }

    }, []);

    //----------------socialLogin start-----------------------
    // signInWithPopupGoogle
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    // signInWithPopupFacebook
    const facebookSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, facebookProvider);
    }
    // signInWithPopupGitHub
    const gitHubSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    }
    //----------------socialLogin end------------------------


    // // signInWithPopupGoogle
    // const providerLoginGoogle = (provider) => {
    //     setLoading(true);
    //     return signInWithPopup(auth, provider);
    // }

    // // signInWithPopupFacebook
    // const providerLoginFacebook = (provider) => {
    //     setLoading(true);
    //     return signInWithPopup(auth, provider);
    // }
    // // signInWithPopupGitHub
    // const providerLoginGithub = (provider) => {
    //     setLoading(true);
    //     return signInWithPopup(auth, provider);
    // }



    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        // providerLoginGoogle,
        // providerLoginFacebook,
        // providerLoginGithub,
        logOut,
        googleSignIn,
        facebookSignIn,
        gitHubSignIn

    }

    return (
        <AuthContext.Provider value={authInfo} >
            {children}
        </AuthContext.Provider >
    )

};

export default AuthProvider;