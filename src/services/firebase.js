import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBb7MhGrMJi17fhUjRjoNb5oLKmmX7Rr6I",
  authDomain: "fullstak-bab7f.firebaseapp.com",
  databaseURL: "https://fullstak-bab7f.firebaseio.com",
  projectId: "fullstak-bab7f",
  storageBucket: "fullstak-bab7f.appspot.com",
  messagingSenderId: "432099852030",
  appId: "1:432099852030:web:d38acd98f3b7f468086faf"
};

firebase.initializeApp(firebaseConfig);

const fbProvider = new firebase.auth.FacebookAuthProvider();
const ghProvider = new firebase.auth.GithubAuthProvider();

export const fbAuth = async () => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  return firebase.auth().signInWithPopup(fbProvider)
}

export const ghAuth = async () => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  return firebase.auth().signInWithPopup(ghProvider)
}


export const auth = firebase.auth;

export const db = firebase.firestore();
