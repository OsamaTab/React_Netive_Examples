import firebase from "firebase";
import {LOGIN, LOGOUT, RETREVE_TOKEN,CURRENT_USER} from '../constants/index'
import AsyncStorage from "@react-native-async-storage/async-storage";


export function SIGNIN(email, password){
  return(async(dispatch)=>{
    
  firebase.auth().signInWithEmailAndPassword(email, password).then(async(result)=>{
    try {
      await AsyncStorage.setItem("userToken", JSON.stringify(result.user.uid));
    } catch (e) {
      console.log("error1");
    }
    dispatch({ type: LOGIN, Token: JSON.stringify(result.user.uid) });
  }).catch((error) => console.log(error));
})
}

export function SIGNUP(name , email, password){
  return(async(dispatch)=>{
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(async(result) => {
    firebase.auth().signInWithEmailAndPassword(email, password);
    try {
      await AsyncStorage.setItem("userToken", JSON.stringify(result.user.uid));
    } catch (e) {
      console.log("error1");
    }
    dispatch({ type: LOGIN, Token: JSON.stringify(result.user.uid) });
    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({name,email});
  })
  .catch((error) => console.log(error));
})
}

export function SIGNOUT(){
  return(async(dispatch)=>{
  try {
    await AsyncStorage.removeItem("userToken");
  } catch (e) {
    console.log("error1");
  }
  dispatch({ type: LOGOUT });
})
}

export function fetchToken() {
  return(async(dispatch)=>{
    try {
      const value = await AsyncStorage.getItem("userToken");
      if (value !== null) {
        dispatch({ type: RETREVE_TOKEN, Token: value });
      }
    } catch (error) {
      console.log(error);
    }
  })
}


export function fetchUser() {
  return(async(dispatch)=>{
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
    firebase.firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(
          async(snapshot)=>{
            if(snapshot.exists){
            await dispatch({type: CURRENT_USER , currentUser : snapshot.data()})
            }
            else{
            console.log('error_fitchUser')
      }});
    }})})
}
