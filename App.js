import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import MainStackNavigators from "./navigators/MainStackNavigator";
import { store } from "./store/store";


export default function App() {
  const [fontsLoaded] = useFonts({
    Light: require("./assets/fonts/Montserrat-Light.ttf"),
    Regular: require("./assets/fonts/Montserrat-Regular.ttf"),
    Medium: require("./assets/fonts/Montserrat-Medium.ttf"),
    SemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
  });

  return fontsLoaded ? (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <MainStackNavigators />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  ) : null;
}
