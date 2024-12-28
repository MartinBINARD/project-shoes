import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "react-native";
import { colors } from "../constants/colors";
import Details from "../screens/details";
import BottomTabsNavigator from "./BottomTabsNavigator";

const Stack = createNativeStackNavigator();

export default function MainStackNavigators() {
  return (
    <Stack.Navigator screenOptions={ () => ({
      headerStyle: { backgroundColor: colors.LIGHT },
      headerShadowVisible: false,
      headerTitleAlign: "center",
      })}>
      <Stack.Screen 
        component={BottomTabsNavigator}
        name="BottomTabs"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        component={Details} 
        name="Details"
        options={({ navigation }) => ({
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color={colors.DARK} />
            </Pressable>
          ),
        })}
      />
    </Stack.Navigator>
  );
}