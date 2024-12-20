import { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { spaces } from "../../../../constants/spaces";
import { brands } from "../../../../data/brands";
import ItemSeparator from "../../../../ui-components/separators/ListItemSeparator";
import BrandItem from "./BrandItem";

export default function BrandsList() {
  const [selectedBrand, setSelectedBrand]= useState("nike");

  return (
    <FlatList
      horizontal
      data={brands}
      keyExtractor={(item) => item.name}
      style={styles.listContainer}
      contentContainerStyle={styles.contentStyle}
      ItemSeparatorComponent={<ItemSeparator width={spaces.L} />}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <BrandItem
          item={item}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          index={index}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flexGrow: 0,
  },
  contentStyle: {
    justifyContent: "space-between",
  },
});