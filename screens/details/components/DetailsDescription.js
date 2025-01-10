import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../../constants/colors';
import { ICON_SIZE } from '../../../constants/sizes';
import { spaces } from '../../../constants/spaces';
import { useAddFavoriteMutation, useGetAllFavoritesQuery, useUpdateFavoritesMutation } from '../../../store/api/favoritesApi';
import TextBoldL from '../../../ui-components/texts/TextBoldL';
import TextBoldXL from '../../../ui-components/texts/TextBoldXL';
import TextMediumM from '../../../ui-components/texts/TextMediumM';

export default function DetailsDescription({ name, price, description, id }) {
    // const dispatch = useDispatch();
    // const favoritesShoesIds = useSelector((state) => state.favorites.favoritesShoesIds);
    // const isFavorite = favoritesShoesIds.includes(id);
    const [addToFavorite] = useAddFavoriteMutation();
    const [updateFavorites] = useUpdateFavoritesMutation();
    const { data: favorite, favorites } = useGetAllFavoritesQuery(undefined, {
        selectFromResult: ({ data }) => ({
            data: data?.shoesIds?.find((el) => el === id),
            favorites: data,
        }),
    });
    const iconName = favorite ? 'star' : 'staro';

    const toggleFavorite = () => {
        if (favorite) {
            // dispatch(removeFavorite(id));
            updateFavorites({
                id: favorites.id,
                shoesIds: favorites.shoesIds.filter((el) => el !== id),
            });
        } else if (favorites.id) {
            // dispatch(addFavorite(id));
            updateFavorites({
                id: favorites.id,
                shoesIds: [...favorites.shoesIds, id],
            });
        } else {
            addToFavorite(id);
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
