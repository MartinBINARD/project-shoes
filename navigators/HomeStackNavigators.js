import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable } from "react-native";
import { colors } from "../constants/colors";
import HomeScreen from "../screens/home";
import List from "../screens/list";
import NewsList from "../screens/newsList";

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={ ({ navigation }) => ({
      headerStyle: { backgroundColor: colors.LIGHT },
      headerShadowVisible: false,
      headerTitleAlign: "center",
      headerLeft: () => <Pressable onPress={() => navigation.goBack()}><Ionicons name="chevron-back" size={24} color={colors.DARK} /></Pressable>
      })}>
      <Stack.Screen component={HomeScreen} name="Home" options={{ 
        title: "Shoes",
        headerLeft: null
       }} />
      <Stack.Screen component={List} name="List" />
      <Stack.Screen component={NewsList} name="NewsList" options={{ title: "Nouveautés" }} />
    </Stack.Navigator>
  );
}