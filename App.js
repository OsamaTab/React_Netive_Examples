import React, { useState, useEffect } from "react";
import Navigation from "./routes/navigation";
import { StatusBar, StyleSheet, View, Image } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import AnimatedLoader from "react-native-animated-loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [Visible, setVisible] = useState(true);
  const [Auth, setAuth] = useState(false);
  
  const gitBiometricAuth = async () =>{
    await AsyncStorage.getItem("biometric", (err, value) => {
      if (err) {
        console.log(err);
      } else {
        setAuth(JSON.parse(value));
      }
    });
  }
  useEffect(() => {
    gitBiometricAuth()
    Hide_Splash_Screen()
    biometricAuth()
  }, [Auth]);

  const Hide_Splash_Screen = () => {
    setTimeout(() => {
      setVisible(false);
    }, 1000);
  };

  const biometricHandeler = async () => {
    setAuth(!Auth);
    try {
      await AsyncStorage.setItem(
        "biometric",
        JSON.stringify(!Auth)
      );
    } catch (e) {
      console.log("error1");
    }
  };

  const biometricAuth =() =>{
    console.log(Auth);
     if (Auth) {
      if (LocalAuthentication.hasHardwareAsync()) {
        LocalAuthentication.authenticateAsync({
          promptMessage: "               Inter Your FingerPrint",
        });
      }
    }
  }
  return (
    <View style={{flex:1}}>
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
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});
