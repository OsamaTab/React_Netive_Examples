import React from "react";
import { StyleSheet, View } from "react-native";
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
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export function DrawerContent(props) {
  const paperTheme = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerSection}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
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

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" size={size} color={color} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            ></DrawerItem>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="account-outline" size={size} color={color} />
              )}
              label="Profile"
              onPress={console.log("fdstt")}
            ></DrawerItem>
           
          </Drawer.Section>
          <Drawer.Section title="Prefrenses">
            <TouchableRipple onPress={() => props.toggleTheme()}>
              <View style={styles.prefrenece}>
                <Text> Dark Mode</Text>
                <View pointerEvents="none">
                  <Switch 
                  value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => props.biometricHandeler()}>
              <View style={styles.prefrenece}>
                <Text>Biometric authentication</Text>
                <View pointerEvents="none">
                  <Switch value={props.isAuth} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" size={size} color={color} />
          )}
          label="Sign out"
          onPress={console.log("fdsfff")}
        ></DrawerItem>
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
  },
  prefrenece: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
});
