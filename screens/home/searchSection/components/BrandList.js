import { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { brands } from "../../../../data/brands";
import BrandItem from "./BrandItem";
import ItemHorizontalSeparator from "./ItemHorizontalSeparator";

export default function BrandsList() {
  const [selectedBrand, setSelectedBrand]= useState("nike");

  return (
    <FlatList
      horizontal
      data={brands}
      keyExtractor={(item) => item.name}
      style={styles.listContainer}
      contentContainerStyle={styles.contentStyle}
      ItemSeparatorComponent={ItemHorizontalSeparator}
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