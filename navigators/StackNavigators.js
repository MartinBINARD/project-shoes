import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home";
import List from "../screens/list";
import NewsList from "../screens/newsList";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={HomeScreen} name="Home" />
        <Stack.Screen component={List} name="List" />
        <Stack.Screen component={NewsList} name="NewsList" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}