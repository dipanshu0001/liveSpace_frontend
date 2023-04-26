import { app } from '../Functions/FireBase-config.js'
import "firebase/auth";
import {
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    updateProfile
} from "firebase/auth";
import { toast } from 'react-toastify'
import { isRouteErrorResponse } from 'react-router-dom';




const auth = getAuth(app);
const googleauth = new GoogleAuthProvider();


export const handlelogin_email = (email, password) => {
    return new Promise((resolve, reject) => signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Handle successful sign-in
            const user = userCredential.user;
            // return { message: 'Signed in as ' + user.displayName, iserror: 1, data: user };
            resolve({ message: 'Signed in as ' + user.displayName, iserror: 1, ...user })
        })
        .catch((error) => {
            // Handle sign-in errors
            const errorCode = error.code;
            // console.log(errorCode)
            let message = "";
            let iserror = 3
            // console.error(`Error signing in: ${errorMessage} (${errorCode})`)
            if (errorCode === "auth/user-not-found") {
                message = "The email address you entered is not registered."
                iserror = 2;
            }
            else if (errorCode === 'auth/wrong-password') {
                message = "The password you entered is wrong "
                iserror = 2;
            }
            else if (errorCode === 'auth/invalid-email') {
                message = "Please enter a valid email address"
                iserror = 2;
            }
            else {
                message = "An error occurred while Login. Please try again later";
            }
            let errmsg = new Error(message);
            errmsg.iserror = iserror
            // throw errmsg;
            reject(errmsg);
        })
    )

}
export const handlelogin_google = () => {
    googleauth.addScope('profile');
    googleauth.addScope('email');
    googleauth.setCustomParameters({
        'login_hint': 'user@example.com'
    });
    return new Promise((resolve, reject) => {
        return signInWithPopup(auth, googleauth)
            .then(result => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                resolve(user)
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                let errmssg = new Error(credential);
                errmssg.iserror = 1;
                reject(errmssg);
            })
    })
}

export const handleSingup_email = ({ email, password, name }) => {
    // setconfirm(true)
    // console.log(typeof (email), password, name)
    return createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            // console.log(userCredential.user)
            return updateProfile(auth.currentUser, {
                displayName: name
            }).then(() => {
                // Profile updated!
                return { message: "Registered Successfully", iserror: 1,uid:userCredential.user.uid };
            }).catch((error) => {
                throw new Error("An error occurred. Please try again after some time.");
            });
        }).catch(error => {
            let message = ""
            let iserror = 3
            if (error.code === 'auth/email-already-in-use') {
                message = 'Email already in use. Please choose a different email.';
            } else if (error.code === 'auth/weak-password') {
                message = 'Password should be at least 6 characters';
                iserror = 2
            }
            else {
                message = "An error occurred Please try again after some time"
            }
            console.log(message, typeof (iserror));
            let err = new Error(message);
            err.iserror = iserror;
            throw err;
        })
}
export const set_err = (err, iserror) => {
    // console.log(err, iserror)
    if (iserror == 1) {
        toast(err);
    }
    else if (iserror == 2) {
        toast.warning(err)
    }
    else toast.error(err);
}