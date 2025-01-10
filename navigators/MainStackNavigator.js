import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable } from 'react-native';
import { colors } from '../constants/colors';
import Signup from '../screens/auth/Signup';
import Cart from '../screens/cart';
import Details from '../screens/details';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

export default function MainStackNavigators() {
    return (
        <Stack.Navigator
            screenOptions={() => ({
                headerStyle: { backgroundColor: colors.LIGHT },
                headerShadowVisible: false,
                headerTitleAlign: 'center',
            })}
        >
            <Stack.Screen component={Signup} name="Singup" options={{ title: "Formulaire d'inscription" }} />
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
    );
}
