import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import BottomTabsBackground from '../assets/images/navigation/bottomTabsBackground.svg';
import CartIcon from '../assets/images/navigation/cart.svg';
import DrawerIcon from '../assets/images/navigation/drawer.svg';
import FavoriteIcon from '../assets/images/navigation/favorite.svg';
import HomeIcon from '../assets/images/navigation/home.svg';
import NotificationsIcon from '../assets/images/navigation/notifications.svg';
import ProfileIcon from '../assets/images/navigation/user.svg';
import { colors } from '../constants/colors';
import { radius } from '../constants/radius';
import { FOCUSED_ICON_SIZE, IS_LARGE_SCREEN, SCREEN_WIDTH, SMALL_ICON_SIZE } from '../constants/sizes';
import { spaces } from '../constants/spaces';
import Cart from '../screens/cart';
import Favorites from '../screens/favorites';
import Notifications from '../screens/notifications';
import Profile from '../screens/profile';
import { useGetUserByIdQuery } from '../store/api/userApi';
import HomeStackNavigator from './HomeStackNavigators';
import AnimatedScreenWrapper from './components/AnimatedScreenWrapper';

const Tabs = createBottomTabNavigator();

const originalWidth = 375;
const originalHeight = IS_LARGE_SCREEN ? 212 : 106;
const aspectRatio = originalWidth / originalHeight;

export default function BottomTabsNavigator() {
    const { userId, token } = useSelector((state) => state.auth);
    const { data: user } = useGetUserByIdQuery({ userId, token });
    const badgeCount = user?.cart?.shoes?.length;
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    return (
        <AnimatedScreenWrapper>
            <View
                style={{
                    flex: 1,
                    paddingBottom: insets.bottom,
                    backgroundColor: colors.WHITE,
                }}
            >
                <Tabs.Navigator
                    screenOptions={({ navigation }) => ({
                        unmountOnBlur: true,
                        tabBarStyle: {
                            height: originalHeight,
                            backgroundColor: colors.LIGHT,
                            paddingTop: insets.bottom + 20,
                            elevation: 0,
                            borderTopWidth: 0,
                        },
                        tabBarShowLabel: false,
                        tabBarActiveTintColor: colors.BLUE,
                        tabBarInactiveTintColor: colors.GREY,
                        tabBarBackground: () => (
                            <View style={{ aspectRatio }}>
                                <BottomTabsBackground
                                    width={SCREEN_WIDTH}
                                    height={'100%'}
                                    viewBox={`0 0 ${originalWidth} ${originalHeight}`}
                                />
                            </View>
                        ),
                        headerTitleAlign: 'center',
                        headerLeft: () => (
                            <Pressable style={styles.drawerIconContainer} onPress={() => navigation.getParent().openDrawer()}>
                                <DrawerIcon />
                            </Pressable>
                        ),
                    })}
                >
                    <Tabs.Screen
                        component={HomeStackNavigator}
                        name="HomeStack"
                        options={{
                            headerShown: false,
                            tabBarIcon: ({ color, focused }) => (
                                <HomeIcon
                                    width={focused ? FOCUSED_ICON_SIZE : SMALL_ICON_SIZE}
                                    height={focused ? FOCUSED_ICON_SIZE : SMALL_ICON_SIZE}
                                    color={color}
                                />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        component={Favorites}
                        name="Favorites"
                        options={{
                            tabBarIcon: ({ color, focused }) => (
                                <FavoriteIcon
                                    width={focused ? FOCUSED_ICON_SIZE : SMALL_ICON_SIZE}
                                    height={focused ? FOCUSED_ICON_SIZE : SMALL_ICON_SIZE}
                                    color={color}
                                />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        component={Cart}
                        name="Cart"
                        listeners={{
                            tabPress: (e) => {
                                e.preventDefault();
                                navigation.navigate('MainCart');
                            },
                        }}
                        options={({ navigation }) => ({
                            tabBarBadge: badgeCount ? badgeCount : undefined,
                            tabBarBadgeStyle: {
                                backgroundColor: colors.LIGHT,
                                colors: colors.BLUE,
                                marginTop: Platform.select({ ios: -30, android: 0 }),
                            },
                            tabBarIcon: ({ color }) => (
                                <Pressable
                                    style={[styles.cartContainer, badgeCount ? styles.activeCart : styles.inactiveCart]}
                                    onPress={() => navigation.navigate('MainCart')}
                                >
                                    <CartIcon
                                        width={badgeCount ? FOCUSED_ICON_SIZE : SMALL_ICON_SIZE}
                                        height={badgeCount ? FOCUSED_ICON_SIZE : SMALL_ICON_SIZE}
                                        color={badgeCount ? colors.WHITE : color}
                                    />
                                </Pressable>
                            ),
                        })}
                    />
                    <Tabs.Screen
                        component={Notifications}
                        name="Notifications"
                        options={{
                            tabBarIcon: ({ color, focused }) => (
                                <NotificationsIcon
                                    width={focused ? FOCUSED_ICON_SIZE : SMALL_ICON_SIZE}
                                    height={focused ? FOCUSED_ICON_SIZE : SMALL_ICON_SIZE}
                                    color={color}
                                />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        component={Profile}
                        name="Profile"
                        options={{
                            tabBarIcon: ({ color, focused }) => (
                                <ProfileIcon
                                    width={focused ? FOCUSED_ICON_SIZE : SMALL_ICON_SIZE}
                                    height={focused ? FOCUSED_ICON_SIZE : SMALL_ICON_SIZE}
                                    color={color}
                                />
                            ),
                        }}
                    />
                </Tabs.Navigator>
            </View>
        </AnimatedScreenWrapper>
    );
}

const styles = StyleSheet.create({
    drawerIconContainer: {
        marginLeft: spaces.L,
    },
    cartContainer: {
        width: 60,
        height: 60,
        borderRadius: radius.FULL,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 60,
    },
    activeCart: {
        backgroundColor: colors.BLUE,
    },
    inactiveCart: {
        backgroundColor: colors.WHITE,
    },
});
