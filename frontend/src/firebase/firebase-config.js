import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCcmbOD2WxIVx_SnbjX_8bAa397ZlEoRqg",
  authDomain: "proshop-heroku.firebaseapp.com",
  projectId: "proshop-heroku",
  storageBucket: "proshop-heroku.appspot.com",
  messagingSenderId: "688765400363",
  appId: "1:688765400363:web:85103b378379909e2f416e",
  measurementId: "G-CZJCB3NVRE"
};


  firebase.initializeApp(firebaseConfig);

  const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

  export { facebookAuthProvider, firebase };

