import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import * as SecureStore from 'expo-secure-store';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartIcon from '../assets/images/navigation/cart.svg';
import FavoriteIcon from '../assets/images/navigation/favorite.svg';
import HomeIcon from '../assets/images/navigation/home.svg';
import NotificationsIcon from '../assets/images/navigation/notifications.svg';
import ProfileIcon from '../assets/images/navigation/user.svg';
import { colors } from '../constants/colors';
import { radius } from '../constants/radius';
import { SMALL_ICON_SIZE } from '../constants/sizes';
import { spaces } from '../constants/spaces';
import { useGetUserByIdQuery } from '../store/api/userApi';
import { setToken } from '../store/slices/authSlice';
import TextBoldXL from '../ui-components/texts/TextBoldXL';
import { useNotifications } from '../utils/notifications';
import BottomTabsNavigator from './BottomTabsNavigator';

const Drawer = createDrawerNavigator();

const routes = [
    { name: 'HomeStack', label: 'Accueil', icon: HomeIcon, index: 0 },
    { name: 'Favorites', label: 'Favoris', icon: FavoriteIcon, index: 1 },
    { name: 'MainCart', label: 'Panier', icon: CartIcon, index: 2 },
    {
        name: 'Notifications',
        label: 'Notifications',
        icon: NotificationsIcon,
        index: 3,
    },
    { name: 'Profile', label: 'Profil', icon: ProfileIcon, index: 4 },
];

export default function DrawerNavigator() {
    const { expoPushToken } = useNotifications();
    console.log(expoPushToken);

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerStyle: {
                    backgroundColor: colors.DARK,
                    width: '72%',
                },
                overlayColor: 'transparent',
                sceneContainerStyle: {
                    backgroundColor: colors.DARK,
                },
                headerShown: false,
            }}
        >
            <Drawer.Screen component={BottomTabsNavigator} name="BottomTabs" />
        </Drawer.Navigator>
    );
}

const Label = ({ shoesInCartCount, label, activeIndex, index }) => {
    return shoesInCartCount && label === 'Panier' ? (
        <View style={styles.cartView}>
            <Text style={[styles.label, { color: colors.BLUE }]}>{label}</Text>
            <View style={styles.activeCartContainer}>
                <Text style={{ color: colors.WHITE }}>{shoesInCartCount}</Text>
            </View>
        </View>
    ) : (
        <Text style={[styles.label, { color: activeIndex === index ? colors.WHITE : colors.GREY }]}>{label}</Text>
    );
};

function CustomDrawerContent(props) {
    const dispatch = useDispatch();
    const { userId, token } = useSelector((state) => state.auth);
    const { data: user } = useGetUserByIdQuery({ userId, token });
    const activeIndex = props.state.routes[0].state?.index || 0;
    const shoesInCartCount = user?.cart?.shoes?.length;

    const logout = () => {
        dispatch(setToken());
        SecureStore.deleteItemAsync('refreshToken');
    };
    return (
        <DrawerContentScrollView>
            <View style={styles.userInfosContainer}>
                <View style={styles.imageContainer}>
                    {user?.photoUrl ? (
                        <Image
                            source={{
                                uri: user.photoUrl,
                            }}
                            style={styles.image}
                        />
                    ) : (
                        <FontAwesome name="user-circle" size={90} color={colors.BLUE} />
                    )}
                </View>
                <TextBoldXL style={styles.text}>{user?.fullName}</TextBoldXL>
            </View>
            {/* <DrawerItemList {...props} /> */}
            {routes.map((route) => (
                <DrawerItem
                    key={route.name}
                    label={() => (
                        <Label label={route.label} activeIndex={activeIndex} index={route.index} shoesInCartCount={shoesInCartCount} />
                    )}
                    icon={() => (
                        <route.icon
                            width={SMALL_ICON_SIZE}
                            height={SMALL_ICON_SIZE}
                            color={
                                shoesInCartCount && route.label === 'Panier'
                                    ? colors.BLUE
                                    : activeIndex === route.index
                                      ? colors.WHITE
                                      : colors.GREY
                            }
                        />
                    )}
                    onPress={() => props.navigation.navigate(route.name)}
                    labelStyle={[styles.label, { color: activeIndex === route.index ? colors.WHITE : colors.GREY }]}
                />
            ))}

            <DrawerItem
                label="Déconnexion"
                icon={() => <MaterialIcons name="logout" size={SMALL_ICON_SIZE} color={colors.GREY} />}
                labelStyle={[styles.label, { color: colors.GREY }]}
                style={styles.logoutItem}
                onPress={logout}
            />
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    userInfosContainer: {
        marginLeft: spaces.L,
        marginVertical: spaces.XL,
    },
    imageContainer: {
        width: 90,
        height: 90,
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: radius.FULL,
    },
    text: {
        color: colors.WHITE,
        marginTop: spaces.L,
    },
    label: {
        fontSize: 18,
        fontFamily: 'Medium',
    },
    logoutItem: {
        borderTopWidth: 1,
        borderTopColor: colors.GREY,
        paddingTop: spaces.XL,
        marginTop: spaces.XL,
    },
    cartView: {
        flexDirection: 'row',
    },
    activeCartContainer: {
        marginLeft: spaces.M,
        width: SMALL_ICON_SIZE,
        height: SMALL_ICON_SIZE,
        backgroundColor: colors.BLUE,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: radius.FULL,
    },
});
