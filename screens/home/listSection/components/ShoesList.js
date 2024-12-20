import { FlatList, StyleSheet } from "react-native";
import { spaces } from "../../../../constants/spaces";
import { shoes } from "../../../../data/shoes";

import ItemSeparator from "../../../../ui-components/separators/ListItemSeparator";
import Verticalcard from "./VerticalCard";

export default function ShoesList() {
  const data = shoes[0].stock.filter((item) => !item.new);

  return (
    <FlatList
      data={data}
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