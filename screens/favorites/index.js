import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../../constants/colors";
import { SCREEN_HEIGHT } from "../../constants/sizes";
import { spaces } from "../../constants/spaces";
import { shoes } from "../../data/shoes";
import VerticalCard from "../../ui-components/cards/VerticalCard";
import ListItemSeparator from "../../ui-components/separators/ListItemSeparator";
import TextBoldL from "../../ui-components/texts/TextBoldL";


export default function Favorites({ navigation }) {
  const favoritesShoesIds = useSelector(state => state.favorites.favoritesShoesIds);
  const data = favoritesShoesIds.map(id =>
    shoes
      .find(item => item.stock.find(elem => elem.id === id))
      .stock.find(el => el.id === id)
  );

  const navigateToDetails = (id) => { navigation.navigate("Details", { id })};

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <VerticalCard 
        item={item} 
        listScreen 
        onPress={() => navigateToDetails(item.id)}
        isFavorite
      />
    </View>
  );

  if (favoritesShoesIds.length === 0) {
    return (
      <View style={styles.emptyListContainer}>
        <TextBoldL>Vous n'avez pas encore de favoris</TextBoldL>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <FlatList data={data} keyExtractor={(item) => item.id} renderItem={renderItem} numColumns={2} ItemSeparatorComponent={<ListItemSeparator height={spaces.L} contentContainerStyle={styles.contentStyle} />}/>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.LIGHT
  },
  container: {
    height: SCREEN_HEIGHT,
    backgroundColor: colors.LIGHT,
    paddingTop: spaces.L,
    paddingBottom: 150
  },
  contentStyle: {
    paddingBottom: spaces.XL
  },
  cardContainer: {
    flex: 0.5,
    height: 240,
    justifyContent: "center",
    alignItems: "center"
  }
})