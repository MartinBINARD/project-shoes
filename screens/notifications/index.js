import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { colors } from '../../constants/colors';
import { spaces } from '../../constants/spaces';
import { shoes } from '../../data/shoes';
import {
    useAddSeenNotificationsMutation,
    useGetAllSeenNotificationsQuery,
    useUpdateSeenNotificationsMutation,
} from '../../store/api/notificationsApi';
import ListItemSeparator from '../../ui-components/separators/ListItemSeparator';
import ListItem from './components/Listitem';

const ids = ['nik43p', 'nik47p', 'nik64p'];

export default function Notifications({ navigation }) {
    const { data: seenNotifs, isLoading } = useGetAllSeenNotificationsQuery();
    const [addSeenNotif] = useAddSeenNotificationsMutation();
    const [updateSeenNotif] = useUpdateSeenNotificationsMutation();

    const data = ids.map((id) => shoes.find((item) => item.stock.find((elem) => elem.id === id)).stock.find((item) => item.id === id));

    const navigateToDetails = (id) => navigation.navigate('Details', { id });

    const updateNotif = (id) => {
        if (seenNotifs.id) {
            updateSeenNotif({
                id: seenNotifs.id,
                notifIds: [...seenNotifs.notifIds, id],
            });
        } else {
            addSeenNotif(id);
        }
    };
    const renderItem = ({ item }) => (
        <ListItem
            item={item}
            navigateToDetails={navigateToDetails}
            isSeen={seenNotifs?.notifIds?.includes(item.id)}
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
