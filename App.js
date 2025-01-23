import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { getApps, initializeApp } from 'firebase/app';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import MainStackNavigators from './navigators/MainStackNavigator';
import { store } from './store/store';
import { firebaseConfig } from './firebaseConfig';

export default function App() {
    const apps = getApps();
    if (apps.length === 0) {
        initializeApp(firebaseConfig);
    }

    const [fontsLoaded] = useFonts({
        Light: require('./assets/fonts/Montserrat-Light.ttf'),
        Regular: require('./assets/fonts/Montserrat-Regular.ttf'),
        Medium: require('./assets/fonts/Montserrat-Medium.ttf'),
        SemiBold: require('./assets/fonts/Montserrat-SemiBold.ttf'),
    });

    return fontsLoaded ? (
        <Provider store={store}>
            <SafeAreaProvider>
                <GestureHandlerRootView>
                    <NavigationContainer>
                        <MainStackNavigators />
                    </NavigationContainer>
                </GestureHandlerRootView>
            </SafeAreaProvider>
        </Provider>
    ) : null;
}
