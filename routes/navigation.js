import React, { useState, useLayoutEffect, useMemo } from "react";
import { StatusBar } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";
import COLORS from "../styles/colors";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigtion from "./tabNavigtion";
import { DrawerContent } from "../componanet/DrawerContent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../screens/signIn";
import SignUp from "../screens/signUp";
import {fetchUser,fetchToken} from '../redux/action/index'
import { useDispatch,useSelector } from 'react-redux'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


const Navigation = ({ biometricHandeler, isAuth }) => {
  const [isDarkTheme, setDarkTheme] = useState(false);
  
  const user = useSelector(store => store.userState.currentUser)
  const Token = useSelector(store => store.userState.userToken)

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    fetchData();
    if(user===undefined){
      dispatch(fetchUser());
    }
    dispatch(fetchToken());
  }, [user,Token]);

  const toggleTheme = () => {
    setDarkTheme(!isDarkTheme);
    try {
      AsyncStorage.setItem("DarkMode", JSON.stringify(!isDarkTheme));
    } catch (e) {
      console.log("error1");
    }
  };

  const fetchData = async() => {
    await AsyncStorage.getItem("DarkMode", (err, value) => {
      if (err) {
        console.log(err);
      } else {
        setDarkTheme(JSON.parse(value));
      }
    });
  };

  const CustumDefaultTheme = {
    ...PaperDefaultTheme,
    ...DefaultTheme,
    color: {
      ...PaperDefaultTheme.colors,
      modal: COLORS.white,
      refresh: COLORS.refreshGrey,
      refresh2: COLORS.refreshGrey2,
      text: COLORS.dark,
      surface: COLORS.surfaceWhite,
    },
  };
  const CustumDarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    color: {
      ...PaperDarkTheme.colors,
      modal: COLORS.dark,
      refresh: COLORS.refreshDark,
      refresh2: COLORS.refreshDark2,
      text: COLORS.white,
      surface: COLORS.surfaceDark,
    },
  };

  const theme = isDarkTheme ? CustumDarkTheme : CustumDefaultTheme;

  return (
      <PaperProvider theme={theme}>
        <StatusBar backgroundColor={theme.color.surface} animated={true} />
        <NavigationContainer theme={theme}>
          {Token ? (
            <Drawer.Navigator
              initialRouteName="Home"
              drawerContent={(props) => (
                <DrawerContent
                  isAuth={isAuth}
                  biometricHandeler={biometricHandeler}
                  toggleTheme={toggleTheme}
                  {...props}
                />
              )}
            >
              <Drawer.Screen
                name="Home"
                children={() => (
                  <TabNavigtion
                    isAuth={isAuth}
                    biometricHandeler={biometricHandeler}
                    color={theme}
                    toggleTheme={toggleTheme}
                  />
                )}
              />
            </Drawer.Navigator>
          ) : (
            <Stack.Navigator initialRouteName="SignIn">
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </PaperProvider>
  );
};

export default (Navigation);
