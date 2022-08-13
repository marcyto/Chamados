import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


let firebaseConfig = {
    apiKey: "AIzaSyCoyaVFikdhzmsHvu244MAao9RojzAJuyk",
    authDomain: "sistema2-f5e3f.firebaseapp.com",
    projectId: "sistema2-f5e3f",
    storageBucket: "sistema2-f5e3f.appspot.com",
    messagingSenderId: "494747051647",
    appId: "1:494747051647:web:42f9ad8a68f2b7fea4814a",
    measurementId: "G-WYS9LW2HWL"
  };
  //verificar se tem usuario logado
  if(!firebase.apps.length){

    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;
  