import React, { useState } from "react";
import { StyleSheet, View, Button, TextInput } from "react-native";
import {Text ,useTheme} from 'react-native-paper';
import Modal from "react-native-modal";
import { Formik } from "formik";
import * as yup from "yup";


export default function toDo() {
  const {color}= useTheme();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  return (
    <View style={styles.view}>
      <Button title="Show modal" onPress={toggleModal} />
      <Modal
        testID={"modal"}
        isVisible={isModalVisible}
        onSwipeComplete={toggleModal}
        swipeDirection={["up", "left", "right", "down"]}
        style={styles.model}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={[styles.content,{backgroundColor:color.surface}]}>
          <Formik
            validationSchema={validationSchema}
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => console.log(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <>
                <TextInput
                  name="email"
                  placeholder="Email Address"
                  style={styles.textInput}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />
                {errors.password && (
                  <Text style={{ fontSize: 10, color: "red" ,alignSelf:'center'}}>
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
                  <Text style={{ fontSize: 10, color: "red",alignSelf:'center',paddingBottom:10 }}>
                    {errors.password}
                  </Text>
                )}
                <View style={{paddingHorizontal:50 ,paddingVertical:20}}>

                <Button onPress={handleSubmit} title="Submit" />
                </View>
              </>
            )}
          </Formik>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    borderRadius: 8,
    borderColor: "rgba(0, 0, 0, 0.1)",
    paddingVertical:25
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  model: {
    justifyContent: "flex-end",
    margin: 0,
  },
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
});
