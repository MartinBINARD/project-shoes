import { FlatList, StyleSheet } from "react-native";
import { spaces } from "../../../../constants/spaces";
import { shoes } from "../../../../data/shoes";

import ItemSeparator from "../../../../ui-components/separators/ListItemSeparator";
import Verticalcard from "./VerticalCard";

export default function ShoesList({ selectedBrand, inputValue }) {
  const data = shoes
    .find((elem) => elem.brand === selectedBrand)
    .stock.filter((item) => !item.new);

  const fitleredData = inputValue
    ? data.filter((elem) =>
        elem.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    : data;

  return (
    <FlatList
      data={fitleredData}
      renderItem={({ item }) => <Verticalcard item={item} />}
      horizontal
      ItemSeparatorComponent={<ItemSeparator width={spaces.L} />}
      contentContainerStyle={styles.listContainer}
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: spaces.L,
  },
});