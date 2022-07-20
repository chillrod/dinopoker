import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC5OZzYbBmxvnGxTj-m3U98S1o6S0GQk0Y",
  authDomain: "dinopokerapp.firebaseapp.com",
  databaseURL: "https://dinopokerapp-default-rtdb.firebaseio.com",
  projectId: "dinopokerapp",
  storageBucket: "dinopokerapp.appspot.com",
  messagingSenderId: "524389525362",
  appId: "1:524389525362:web:31e72c281474b411b9dfeb",
  measurementId: "G-0ERBZRHF15",
};

export const appFirebase = initializeApp(firebaseConfig);

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// const provider = new GoogleAuthProvider();

export const auth = getAuth();
// signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential?.accessToken;
//     console.log("🚀 ~ file: firebase.ts ~ line 26 ~ .then ~ token", token);
//     // The signed-in user info.
//     const user = result.user;
//     // ...
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });
