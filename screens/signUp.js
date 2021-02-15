import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Formik } from "formik";
import * as yup from "yup";
import { Text, useTheme } from "react-native-paper";
import {useDispatch} from 'react-redux'
import { SIGNUP } from "../redux/action";

export default function signUp({navigation}) {
  const { color } = useTheme();

  const validationSchema = yup.object({
    name: yup
      .string("Enter your name")
      .required("Email is required"),
      
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
      
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });
  
  const dispatch = useDispatch();
  
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={{ flex: 1, backgroundColor: "#00525A" }}>
        <View style={{ flex: 1 }}></View>
        <Animatable.View animation="fadeInUpBig" style={{ flex: 2 }}>
          <View style={[styles.Bottom, { backgroundColor: color.surface }]}>
            <Formik
              validationSchema={validationSchema}
              initialValues={{ name:"", email: "", password: "" }}
              onSubmit={(values) => dispatch(SIGNUP(values.name,values.email,values.password))}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <>
                <TextInput
                    name="name"
                    placeholder="Your Name"
                    style={styles.textInput}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />
                  {errors.name && (
                    <Text
                      style={{
                        fontSize: 10,
                        color: "red",
                        alignSelf: "center",
                      }}
                    >
                      {errors.name}
                    </Text>
                  )}
                  <TextInput
                    name="email"
                    placeholder="Email Address"
                    style={styles.textInput}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                  />
                  {errors.email && (
                    <Text
                      style={{
                        fontSize: 10,
                        color: "red",
                        alignSelf: "center",
                      }}
                    >
                      {errors.email}
                    </Text>
                  )}
                  <TextInput
                    name="password"
                    placeholder="Password"
                    style={styles.textInput}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry
                  />
                  {errors.password && (
                    <Text
                      style={{
                        fontSize: 10,
                        color: "red",
                        alignSelf: "center",
                        paddingBottom: 10,
                      }}
                    >
                      {errors.password}
                    </Text>
                  )}
                  <View style={{ paddingHorizontal: 50, paddingVertical: 20 }}>
                    <Button onPress={handleSubmit} title="SignUp" />
                  </View>
                </>
              )}
            </Formik>
            <View style={{ paddingHorizontal: 50, paddingVertical: 20 }}>
                    <Button onPress={()=>navigation.navigate('SignIn')} title="SignIn" />
                  </View>
          </View>
        </Animatable.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    elevation: 10,
    backgroundColor: "#e6e6e6",
  },
  textInput: {
    height: 40,
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  Bottom: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
});
