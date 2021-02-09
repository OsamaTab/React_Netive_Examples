import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, StatusBar } from "react-native";
import {
  Text,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
  useTheme,
} from "react-native-paper";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

export default function Header({ toggleTheme,isAuth,biometricHandeler }) {
  const paperTheme = useTheme();
  const { color } = useTheme();
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  // const { toggleTheme } = React.useContext(Themes);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View>
      <Modal
        isVisible={isModalVisible}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={400}
        animationOutTiming={400}
        backdropColor="#111"
        backdropOpacity={0.3}
        style={[
          styles.Modal,
          {
            backgroundColor: color.modal,
          },
        ]}
        onBackdropPress={() => setModalVisible(false)}
        hideModalContentWhileAnimating={true}
      >
        <View style={styles.contener}>
          
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Avatar.Image
                size={50}
                source={{ uri: "https://picsum.photos/seed/picsum/1920/1080" }}
              />
              <View style={{ flexDirection: "column", marginLeft: 15 }}>
                <Title style={styles.title}>Fuck you</Title>
                <Caption style={styles.caption}>Yes You</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section title="UserSetting" style={{marginBottom:10}}>
            <TouchableRipple onPress={() => toggleTheme()}>
              <View>
                <Text style={{marginLeft:15,margin:10}}> Profile </Text>
                <Text style={{marginLeft:15,margin:10}}> Setting </Text>

                
              </View>
            </TouchableRipple>
          </Drawer.Section>
          <Drawer.Section title="Prefrenses" >
            <TouchableRipple onPress={() => toggleTheme()}>
              <View style={styles.prefrenece}>
                <Text style={{marginLeft:10}}> Dark Mode</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => biometricHandeler()}>
              <View style={styles.prefrenece}>
                <Text style={{marginLeft:10}}>Biometric authentication</Text>
                <View pointerEvents="none">
                  <Switch value={isAuth} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
          <Text style={{alignSelf:'center',marginTop:7}}> All the Fucker is Resurft</Text>
        </View>
      </Modal>
      <View
        style={{
          flex: 1,
        }}
      >
        <View style={{ position: "absolute", left: 10, alignItems: "center" }}>
          <TouchableOpacity onPress={toggleDrawer}>
            <Icon name="menu-outline" size={24} color={color.text} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
        </View>
        <View
          style={{
            marginRight: 5,
            alignItems: "center",
            alignSelf: "flex-end",
            flex: 1,
            flexDirection: "row",
          }}
        >
          <Icon
            style={{ marginRight: 13 }}
            name="search-outline"
            size={24}
            color={color.text}
            onPress={() => console.log("Pressed")}
          />
          <TouchableOpacity onPress={toggleModal}>
            <Avatar.Image
              size={30}
              source={{ uri: "https://picsum.photos/seed/picsum/1920/1080" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Modal: {
    width: "90%",
    padding: 22,
    marginTop: 100,
    marginBottom: 275,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  contener: {
    flex: 1,
    width: "100%",
  },
  prefrenece: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  userInfoSection: {
    paddingLeft: 10,
    marginBottom:15
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
});
