import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from '../../../constants/colors';
import { ICON_SIZE } from '../../../constants/sizes';
import { spaces } from '../../../constants/spaces';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../../../store/api/userApi';
import TextBoldL from '../../../ui-components/texts/TextBoldL';
import TextBoldXL from '../../../ui-components/texts/TextBoldXL';
import TextMediumM from '../../../ui-components/texts/TextMediumM';

export default function DetailsDescription({ name, price, description, id }) {
    // const [addToFavorite] = useAddFavoriteMutation();
    // const [updateFavorites] = useUpdateFavoritesMutation();
    // const { data: favorite, favorites } = useGetAllFavoritesQuery(undefined, {
    //     selectFromResult: ({ data }) => ({
    //         data: data?.shoesIds?.find((el) => el === id),
    //         favorites: data,
    //     }),
    // });
    const userId = useSelector((state) => state.user.id);
    const { data: user } = useGetUserByIdQuery(userId);
    const [updateUser] = useUpdateUserMutation();
    const isFavorite = user?.favoritesIds?.includes(id);

    const iconName = isFavorite ? 'star' : 'staro';

    const toggleFavorite = () => {
        if (isFavorite) {
            // dispatch(removeFavorite(id));
            updateUser({
                id: userId,
                favoritesIds: user.favoritesIds.filter((el) => el !== id),
            });
        } else if (user?.favoritesIds) {
            // dispatch(addFavorite(id));
            updateUser({
                id: userId,
                favoritesIds: [...user.favoritesIds, id],
            });
        } else {
            updateUser({
                id: userId,
                favoritesIds: [id],
            });
        }
    };

    return (
        <View style={styles.descriptionContainer}>
            <View>
                <TextMediumM blue style={styles.textSpacing}>
                    MEILLEUR CHOIX
                </TextMediumM>
                <View style={styles.nameAndFavoriteContainer}>
                    <TextBoldXL style={styles.textSpacing}>{name}</TextBoldXL>
                    <AntDesign name={iconName} size={ICON_SIZE} color={colors.BLUE} onPress={toggleFavorite} suppressHighlighting={true} />
                </View>
            </View>
            <TextBoldL style={styles.textSpacing}>{price} €</TextBoldL>
            <TextMediumM style={styles.descriptionText}>{description}</TextMediumM>
        </View>
    );
}

const styles = StyleSheet.create({
    descriptionContainer: {
        paddingHorizontal: spaces.L,
    },
    textSpacing: {
        marginBottom: spaces.S,
    },
    nameAndFavoriteContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    descriptionText: {
        color: colors.GREY,
    },
});
