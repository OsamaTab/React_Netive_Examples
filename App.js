import React, { useState, useEffect } from "react";
import Navigation from "./routes/navigation";
import { StatusBar, StyleSheet, View, Image } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import AnimatedLoader from "react-native-animated-loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogBox } from 'react-native';
import * as firebase from "firebase";
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import rootReduser from './redux/reduser';
import thunk from 'redux-thunk'

const store = createStore(rootReduser , applyMiddleware(thunk));

const firebaseConfig = {
  apiKey: "AIzaSyAoWYt8s9XNpupk7EWVOdFowDuhQPvF6aI",
  authDomain: "testing-react-native-b1722.firebaseapp.com",
  projectId: "testing-react-native-b1722",
  storageBucket: "testing-react-native-b1722.appspot.com",
  messagingSenderId: "456598717335",
  appId: "1:456598717335:web:85e67e5d11ca4df8a9bad2",
  measurementId: "G-F0WM02JBN4",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
  const [Visible, setVisible] = useState(true);
  const [Auth, setAuth] = useState(false);

  useEffect(() => {
    gitBiometricAuth();
    if (Auth) {
      biometricAuth();
    }
    else{
      setTimeout(() => {
        setVisible(false);
      }, 1000);
    }
  }, [Auth]);

  const biometricHandeler = async () => {
    setAuth(!Auth);
    try {
      await AsyncStorage.setItem("biometric", JSON.stringify(!Auth));
    } catch (e) {
      console.log("error1");
    }
  };

  const gitBiometricAuth = async () => {
    await AsyncStorage.getItem("biometric", (err, value) => {
      if (err) {
        console.log(err);
      } else{
         setAuth(JSON.parse(value));
      }
    });
  };

  const biometricAuth = async () => {
      if (LocalAuthentication.hasHardwareAsync()) {
        setVisible(true);
        const mes = await LocalAuthentication.authenticateAsync();
        if (!mes.success) {
          biometricAuth();
        } else {
          setVisible(false);
        }
      }
  };

  return (
    <Provider store= {store}>
      <View style={{ flex: 1 }}>
        {Visible ? (
          <AnimatedLoader
            visible={Visible}
            overlayColor='"rgba(255,255,255,0.75)"'
            source={require("./assets/loader.json")}
            animationStyle={styles.lottie}
            speed={1}
          ></AnimatedLoader>
        ) : (
          <Navigation isAuth={Auth} biometricHandeler={biometricHandeler} />
        )}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});
