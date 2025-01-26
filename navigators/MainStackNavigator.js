import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../constants/colors';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import Cart from '../screens/cart';
import Details from '../screens/details';
import List from '../screens/list';
import NewsList from '../screens/newsList';
import SplashScreen from '../screens/splashScreen';
import { useRefreshTokenMutation } from '../store/api/authApi';
import { setToken, setUserId } from '../store/slices/authSlice';
import { setHttpError } from '../store/slices/errorSlice';
import HttpErrorModal from '../ui-components/modals/HttpErrorModal';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
    const insets = useSafeAreaInsets();
    const [refreshTokenMutation, { data }] = useRefreshTokenMutation();
    const token = useSelector((state) => state.auth.token);
    const [isLoading, setIsloading] = useState(!token);
    const [isAppReady, setIsAppReady] = useState(false);
    const httpError = useSelector((state) => state.error.httpError);
    const dispatch = useDispatch();
    const closeHttpErrorModal = () => {
        dispatch(setHttpError(false));
    };

    const getAuthenticatedUser = async () => {
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        if (refreshToken) {
            refreshTokenMutation(refreshToken);
        } else {
            setIsloading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            getAuthenticatedUser();
        }
    }, [token]);

    useEffect(() => {
        if (data) {
            dispatch(setToken(data.id_token));
            dispatch(setUserId(data.user_id));
            SecureStore.setItemAsync('refreshToken', data.refresh_token);
            setIsloading(false);
        }
    }, [data]);

    const appReadyHandler = () => {
        setIsAppReady(true);
    };

    if (!isAppReady) {
        return <SplashScreen appReadyHandler={appReadyHandler} />;
    }

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color={colors.BLUE} size="large" />
            </View>
        );
    }

    return (
        <>
            <Stack.Navigator
                screenOptions={() => ({
                    headerStyle: {
                        backgroundColor: colors.LIGHT,
                    },
                    headerShadowVisible: false,
                    headerTitleAlign: 'center',
                })}
            >
                {!token ? (
                    <>
                        <Stack.Screen component={Login} name="Login" options={{ title: 'Connexion' }} />
                        <Stack.Screen
                            component={Signup}
                            name="Signup"
                            options={{
                                title: "Formulaire d'inscription",
                            }}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            component={DrawerNavigator}
                            name="Drawer"
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Group
                            screenOptions={({ navigation }) => ({
                                headerLeft: () => (
                                    <Pressable onPress={() => navigation.goBack()}>
                                        <Ionicons name="chevron-back" size={24} color={colors.DARK} />
                                    </Pressable>
                                ),
                            })}
                        >
                            <Stack.Screen component={Details} name="Details" />
                            <Stack.Screen
                                component={Cart}
                                name="MainCart"
                                options={({ navigation }) => ({
                                    title: 'Mon Panier',
                                    animation: 'slide_from_bottom',
                                })}
                            />
                            <Stack.Group
                                screenOptions={{
                                    contentStyle: {
                                        backgroundColor: colors.LIGHT,
                                        paddingBottom: insets.bottom,
                                    },
                                }}
                            >
                                <Stack.Screen component={List} name="List" />
                                <Stack.Screen
                                    component={NewsList}
                                    name="NewsList"
                                    options={{
                                        title: 'Nouveautés',
                                    }}
                                />
                            </Stack.Group>
                        </Stack.Group>
                    </>
                )}
            </Stack.Navigator>
            <HttpErrorModal isModalVisible={httpError} closeModal={closeHttpErrorModal} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.LIGHT,
    },
});
