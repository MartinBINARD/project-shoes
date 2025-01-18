import { MaterialIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
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
import BottomTabsNavigator from './BottomTabsNavigator';

const Drawer = createDrawerNavigator();

const routes = [
    { name: 'HomeStack', label: 'Accueil', icon: HomeIcon, index: 0 },
    { name: 'Favorite', label: 'Favoris', icon: FavoriteIcon, index: 1 },
    { name: 'MainCart', label: 'Panier', icon: CartIcon, index: 2 },
    { name: 'Notifications', label: 'Notifications', icon: NotificationsIcon, index: 3 },
    { name: 'Profile', label: 'Profil', icon: ProfileIcon, index: 4 },
];

export default function MyDrawer() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                drawerStyle: {
                    backgroundColor: colors.DARK,
                },
                overlayColor: colors.DARK,
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
    const disptach = useDispatch();
    const userId = useSelector((state) => state.user.id);
    const { data: user } = useGetUserByIdQuery(userId);
    const activeIndex = props.state.routes[0].state?.index || 0;
    const shoesInCartCount = user?.cart?.shoes?.length;

    const logout = () => {
        disptach(setToken());
    };

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.userInfosContainer}>
                <Image
                    source={{
                        uri: 'https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_640.jpg',
                    }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <TextBoldXL style={styles.text}>John Doe</TextBoldXL>
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
                    onPress={() => {
                        if (route.name === 'MainCart') {
                            props.navigation.navigate(route.name);
                        } else {
                            props.navigation.navigate('BottomTabs', { screen: route.name });
                        }
                    }}
                    labelStyle={[styles.label, { color: activeIndex === route.index ? colors.WHITE : colors.GREY }]}
                />
            ))}
            <DrawerItem
                label="Déconnexion"
                onPress={logout}
                icon={() => <MaterialIcons name="logout" size={SMALL_ICON_SIZE} color={colors.GREY} />}
                labelStyle={[styles.label, { color: colors.GREY }]}
                style={styles.logoutItem}
            />
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    userInfosContainer: {
        marginLeft: spaces.L,
        marginVertical: spaces.XL,
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
