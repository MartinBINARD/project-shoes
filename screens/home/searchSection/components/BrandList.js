import { FlatList, StyleSheet } from "react-native";
import { spaces } from "../../../../constants/spaces";
import { brands } from "../../../../data/brands";
import ListItemSeparator from "../../../../ui-components/separators/ListItemSeparator";
import BrandItem from "./BrandItem";

export default function BrandsList({ selectedBrand, setSelectedBrand }) {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={brands}
      bounces={false}
      keyExtractor={(item) => item.name}
      renderItem={({ item, index }) => (
        <BrandItem
          item={item}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          index={index}
        />
      )}
      style={styles.listContainer}
      ItemSeparatorComponent={<ListItemSeparator width={spaces.S} />}
    />
  );
}
const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 0,
  },
});