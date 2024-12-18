import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

const [fontsLoaded] = useFonts({
  Light: require("./assets/fonts/Montserrat-Light.ttf"),
  Regular: require("./assets/fonts/Montserrat-Regular.ttf"),
  Medium: require("./assets/fonts/Montserrat-Medium.ttf"),
  SemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
});

export default function App() {
  return fontsLoaded ? (
    <View style={styles.container}>
      <TextBoldS blue>Open up App.js to start working on your app!</TextBoldS>
      <TextBoldXl>Open up App.js to start working on your app!</TextBoldXl>
      <StatusBar style="auto" />
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
