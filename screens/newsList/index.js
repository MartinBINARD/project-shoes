import { FlatList, StyleSheet, View } from "react-native";
import { colors } from "../../constants/colors";
import { SCREEN_HEIGHT } from "../../constants/sizes";
import { spaces } from "../../constants/spaces";
import { shoes } from "../../data/shoes";
import VerticalCard from "../../ui-components/cards/VerticalCard";
import ListItemSeparator from "../../ui-components/separators/ListItemSeparator";

export default function NewsList() {
  const items = shoes.map((brand) => {
    return brand.stock.find((item) => [item.new])
  })
  const renderItem = ({ item }) => (
      <View style={styles.cardContainer}>
        <VerticalCard item={item} listScreen />
      </View>
    );
  
  return (
    <View style={styles.container}>
      <FlatList data={items} keyExtractor={(item) => item.id} renderItem={renderItem} numColumns={2} ItemSeparatorComponent={<ListItemSeparator height={spaces.L} contentContainerStyle={styles.contentStyle} />}/>
    </View>
  );
}

const styles = StyleSheet.create({
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