import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import List from '../screens/list';
import NewsList from '../screens/newsList';
import { colors } from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Platform, Pressable, StyleSheet } from 'react-native';
import DrawerIcon from '../assets/images/navigation/drawer.svg';
import { spaces } from '../constants/spaces';

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.LIGHT,
                },
                headerShadowVisible: false,
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen
                component={HomeScreen}
                name="Home"
                options={({ navigation }) => ({
                    headerShown: false,
                    title: 'Shoes',
                    headerLeft: () => (
                        <Pressable onPress={() => navigation.getParent().getParent().openDrawer()} style={styles.drawerIconContainer}>
                            <DrawerIcon />
                        </Pressable>
                    ),
                })}
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
                <Stack.Screen component={List} name="List" />
                <Stack.Screen
                    component={NewsList}
                    name="NewsList"
                    options={{
                        title: 'Nouveautés',
                    }}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    drawerIconContainer: {
        marginLeft: Platform.select({ ios: spaces.XS, android: spaces.S }),
    },
});
