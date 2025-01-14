import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from '../../constants/colors';
import { spaces } from '../../constants/spaces';
import { shoes } from '../../data/shoes';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../store/api/userApi';
import ListItemSeparator from '../../ui-components/separators/ListItemSeparator';
import ListItem from './components/Listitem';

const ids = ['nik43p', 'nik47p', 'nik64p'];

export default function Notifications({ navigation }) {
    const userId = useSelector((state) => state.user.id);
    const { data: user, isLoading } = useGetUserByIdQuery(userId);
    const [updateUser] = useUpdateUserMutation();

    const data = ids.map((id) => shoes.find((item) => item.stock.find((elem) => elem.id === id)).stock.find((item) => item.id === id));

    const navigateToDetails = (id) => navigation.navigate('Details', { id });

    const updateNotif = (id) => {
        if (user?.seenNotifsIds) {
            updateUser({
                id: userId,
                seenNotifsIds: [...user.seenNotifsIds, id],
            });
        } else {
            updateUser({
                id: userId,
                seenNotifsIds: [id],
            });
        }
    };
    const renderItem = ({ item }) => (
        <ListItem
            item={item}
            navigateToDetails={navigateToDetails}
            isSeen={user?.seenNotifsIds?.includes(item.id)}
            updateNotif={updateNotif}
        />
    );

    if (isLoading) {
        return (
            <View style={styles.emptyListContainer}>
                <ActivityIndicator size="large" color={colors.DARK} />
            </View>
        );
    }

    return (
        <FlatList
            style={styles.container}
            data={data}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={<ListItemSeparator height={spaces.L} />}
            renderItem={renderItem}
        />
    );
}

const styles = StyleSheet.create({
    emptyListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.LIGHT,
    },
    container: {
        flex: 1,
        backgroundColor: colors.LIGHT,
        paddingTop: spaces.L,
    },
});
