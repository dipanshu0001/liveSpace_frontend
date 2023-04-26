import react, { createContext, useContext, useEffect, useRef, createRef } from 'react'

// import { getAuth, signInWithPopup, GoogleAuthProvider } from "/firebase/auth";
import { database } from '../Functions/FireBase-config';
import { collection, addDoc,getDocs} from "firebase/firestore";



export const DataContext = createContext(null);
function DataProvider({ children }) {

  // const googleauth = new GoogleAuthProvider();
  // const auth = getAuth();
  const agentRef = collection(database, "user-detail");
  // const handlegooglelogin = () => {
  //   signInWithPopup(auth, googleauth)
  //     .then(result => {
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       console.log(user);
  //     })
  //     .catch(error => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //     })
  // }
  const addAgent = async () => {
    console.log("called");
    try {
      const docRef = await addDoc(agentRef, {
        name: "Rahul",
        email: "Rahul@gmail.com"
      });
      console.log("added", docRef.id);
    } catch (error) {
      console.log("error:", error);
    }
  }
  const getUserDetails = async () => {
    console.log("called");
    try {
      const snapshot = await getDocs(agentRef);
      snapshot.forEach(doc => {
        console.log(doc.id, "=>", doc.data());
      });
      // console.log(snapshot.data());
    } catch (error) {
      console.log("error:", error);
    }
  };
  useEffect(() => {
    // addAgent();
    // getUserDetails();
    // console.log(children)
    // addAgent();
  }, [])

  // const adderror = (message) => {
  //   toastref.add({
  //     type: 'error',
  //     message: message,
  //   })
  // }

  return (
    <DataContext.Provider value={{ addAgent }}>
      {children}
    </DataContext.Provider>


  )
}
// export const useData=()=>useContext(DataContext);
export default DataProvider