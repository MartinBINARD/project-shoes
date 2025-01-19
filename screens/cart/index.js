import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { IS_LARGE_SCREEN } from '../../constants/sizes';
import { spaces } from '../../constants/spaces';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../store/api/userApi';
import CustomButton from '../../ui-components/buttons/CustomButton';
import ListItemSeparator from '../../ui-components/separators/ListItemSeparator';
import TextBoldL from '../../ui-components/texts/TextBoldL';
import TextBoldXL from '../../ui-components/texts/TextBoldXL';
import ListItem from './components/ListItem';

export default function Cart() {
    const { userId, token } = useSelector((state) => state.auth);
    const { data: user } = useGetUserByIdQuery({ userId, token });
    const [updateUser] = useUpdateUserMutation();

    const totalAmount = user?.cart?.totalAmount;

    const removeShoesFromCart = (id) => {
        const shoesToRemove = user.cart.shoes.find((el) => el.id === id);
        const newCart = {
            shoes: user.cart.shoes.filter((el) => el.id !== id),
            totalAmount: user.cart.totalAmount - shoesToRemove.price * shoesToRemove.quantity,
        };
        updateUser({
            userId,
            token,
            cart: newCart,
        });
    };

    const updateQuantity = (id, increase) => {
        const newCart = JSON.parse(JSON.stringify(user.cart));
        const index = newCart.shoes.indexOf(newCart.shoes.find((el) => el.id === id));

        if (increase) {
            newCart.shoes[index].quantity += 1;
            newCart.totalAmount += newCart.shoes[index].price;
        } else {
            newCart.shoes[index].quantity -= 1;
            newCart.totalAmount -= newCart.shoes[index].price;
        }
        updateUser({
            userId,
            token,
            cart: newCart,
        });
    };

    if (!user?.cart?.shoes?.length) {
        return (
            <View style={styles.listEmptyContainer}>
                <TextBoldL>Votre panier est vide</TextBoldL>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={user?.cart?.shoes}
                showsVerticalScrollIndicator={false}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) => (
                    <ListItem item={item} removeShoesFromCart={removeShoesFromCart} updateQuantity={updateQuantity} />
                )}
                style={styles.listContainer}
                ItemSeparatorComponent={<ListItemSeparator height={spaces.L} />}
                numColumns={IS_LARGE_SCREEN ? 2 : 1}
            />

            <View style={styles.priceContainer}>
                <View style={styles.rowContainer}>
                    <TextBoldXL>Sous total</TextBoldXL>
                    <TextBoldXL>{totalAmount} €</TextBoldXL>
                </View>

                <View style={styles.rowContainer}>
                    <TextBoldXL>Frais de port</TextBoldXL>
                    <TextBoldXL>{Math.floor(totalAmount / 15)} €</TextBoldXL>
                </View>

                <View style={styles.dashedLine} />
                <View style={styles.rowContainer}>
                    <TextBoldXL>Total</TextBoldXL>
                    <TextBoldXL>{totalAmount + Math.floor(totalAmount / 15)} €</TextBoldXL>
                </View>
                <CustomButton text="Passer la commande" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    listEmptyContainer: {
        flex: 1,
        backgroundColor: colors.LIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: colors.LIGHT,
    },
    listContainer: {
        marginTop: spaces.M,
    },
    priceContainer: {
        backgroundColor: colors.WHITE,
        borderTopLeftRadius: radius.REGULAR,
        borderTopRightRadius: radius.REGULAR,
        padding: spaces.XL,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spaces.M,
    },
    dashedLine: {
        borderWidth: 1,
        borderColor: colors.GREY,
        borderStyle: 'dashed',
        marginBottom: spaces.M,
    },
});
