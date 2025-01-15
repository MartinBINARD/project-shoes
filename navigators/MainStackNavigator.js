import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../constants/colors';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import Cart from '../screens/cart';
import Details from '../screens/details';
import { setErrorHttp } from '../store/slices/errorSlice';
import HttpErrorModal from '../ui-components/modals/HttpErrorModal';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

export default function MainStackNavigators() {
    const httpError = useSelector((state) => state.error.httpError);
    const dispatch = useDispatch();
    const closeHttpErrorModal = () => {
        dispatch(setErrorHttp(false));
    };

    return (
        <>
            <Stack.Navigator
                screenOptions={() => ({
                    headerStyle: { backgroundColor: colors.LIGHT },
                    headerShadowVisible: false,
                    headerTitleAlign: 'center',
                })}
            >
                <Stack.Screen
                    component={Login}
                    name="Login"
                    options={{
                        title: 'Connexion',
                    }}
                />
                <Stack.Screen component={Signup} name="Signup" options={{ title: "Formulaire d'inscription" }} />
                <Stack.Screen
                    component={DrawerNavigator}
                    name="DrawerNavigator"
                    options={{
                        headerShown: false,
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
                <Stack.Screen
                    component={Cart}
                    name="MainCart"
                    options={({ navigation }) => ({
                        animation: 'slide_from_bottom',
                        title: 'Panier',
                        headerLeft: () => (
                            <Pressable onPress={() => navigation.goBack()}>
                                <Ionicons name="chevron-back" size={24} color={colors.DARK} />
                            </Pressable>
                        ),
                    })}
                />
            </Stack.Navigator>
            <HttpErrorModal isModalVisible={httpError} closeModal={closeHttpErrorModal} />
        </>
    );
}
