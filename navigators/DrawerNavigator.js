import { MaterialIcons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Image, StyleSheet, View } from "react-native";
import HomeIcon from "../assets/images/navigation/home.svg";
import ProfileIcon from "../assets/images/navigation/user.svg";
import { colors } from "../constants/colors";
import { radius } from "../constants/radius";
import { SMALL_ICON_SIZE } from "../constants/sizes";
import { spaces } from "../constants/spaces";
import Profile from "../screens/profile";
import TextBoldXL from "../ui-components/texts/TextBoldXL";
import BottomTabsNavigator from "./BottomTabsNavigator";

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: colors.WHITE,
        drawerInactiveTintColor: colors.GREY,
        drawerActiveBackgroundColor: "transparent",
        drawerStyle: {
          backgroundColor: colors.DARK,
        },
        overlayColor: colors.DARK,
        drawerLabelStyle: styles.label,
      }}
    >
      <Drawer.Screen
        component={BottomTabsNavigator}
        name="BottomTabs"
        options={{
          title: "Accueil",
          drawerIcon: ({ color }) => (
          <HomeIcon
              width={SMALL_ICON_SIZE}
              height={SMALL_ICON_SIZE}
              color={color}
          />
          ),
        }}
      />
      <Drawer.Screen
        component={Profile}
        name="Profile"
        options={{
          title: "Profil",
          drawerIcon: ({ color }) => (
          <ProfileIcon
              width={SMALL_ICON_SIZE}
              height={SMALL_ICON_SIZE}
              color={color}
          />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfosContainer}>
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_640.jpg",
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <TextBoldXL style={styles.text}>
          John Doe
        </TextBoldXL>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Déconnexion"
        onPress={() => console.log("logout")}
        icon={() => (
          <MaterialIcons
            name="logout"
            size={SMALL_ICON_SIZE}
            color={colors.GREY}
          />
        )}
        labelStyle={[styles.label, { color: colors.GREY }]}
        style={styles.logoutItem}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  userInfosContainer: {
    marginLeft: spaces.L,
    marginVertical: spaces.XL,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: radius.FULL,
  },
  text: {
    color: colors.WHITE,
    marginTop: spaces.L,
  },
  label: {
    fontSize: 18,
    fontFamily: "Medium",
  },
  logoutItem: {
    borderTopWidth: 1,
    borderTopColor: colors.GREY,
    paddingTop: spaces.XL,
    marginTop: spaces.XL,
  },
});