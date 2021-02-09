import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Home from "../screens/home";
import Reviews from "../screens/reviews";
import About from "../screens/about";
import ToDo from "../screens/toDo";
import Header from '../componanet/header';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const TabNavigtion = ({toggleTheme,color,isAuth,biometricHandeler}) => {

  return(
    <Tab.Navigator 
      initialRouteName="Home"
      activeColor= {color.color.text}
      inactiveColor='#808080'
      shifting={true}
      barStyle={{ borderTopColor:color.color.text+'1' , borderWidth:.5 }}

    >
      <Tab.Screen
        name="Home"
        children={()=><HomeScreen isAuth={isAuth} biometricHandeler={biometricHandeler} toggleTheme={toggleTheme}/>}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: color.color.surface ,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ToDo"
        component={ToDo}
        options={{
          tabBarLabel: 'ToDo',
          tabBarColor:'#f32',

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={About}
        options={{
          tabBarLabel: 'Map',
          tabBarColor:'#00255a',

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    
    </Tab.Navigator>  
  );
}

const HomeScreen = ({toggleTheme,isAuth,biometricHandeler}) => {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        // headerStyle: { backgroundColor: "#222" },
        // headerTintColor: "#fff",
        // headerTitleAlign: "center",
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitle: props => <Header {...props} isAuth={isAuth} biometricHandeler={biometricHandeler} toggleTheme={toggleTheme}/>,
        // headerRight: () => (
        //   <View
        //     style={{
        //       marginRight: 17,
        //       flexDirection: "row",
        //       justifyContent: "center",
        //       alignItems: "center",
        //     }}
        //   >
        //     <Ionicons
        //       style={{ marginRight: 13 }}
        //       name="search-outline"
        //       size={24}
        //       color="black"
        //       onPress={() => console.log("Pressed")}
        //     />
        //     <TouchableOpacity onPress={Home.toggleModal}>
        //       <Avatar.Image
        //         size={30}
        //         source={{ uri: "https://picsum.photos/seed/picsum/1920/1080" }}
        //       />
        //     </TouchableOpacity>
        //   </View>
        // ),
      }}
      mode="modal"
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen
        name="Reviews"
        component={Reviews}
        options={({ route }) => ({
          title: route.params.title,
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalPresentationIOS,
          headerShown: false,
        })}
      />
    </HomeStack.Navigator>
  );
};

export default TabNavigtion;