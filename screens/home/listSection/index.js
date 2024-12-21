import { StyleSheet, View } from "react-native";
import { IS_SMALL_SCREEN } from "../../../constants/sizes";
import { spaces } from "../../../constants/spaces";
import Banner from "../components/Banner";
import ShoesList from "./components/ShoesList";

export default function ListSection({ selectedBrand, inputValue }) {
  return (
    <View style={styles.container}>
      <Banner text="Shoes populaires" />
      <ShoesList selectedBrand={selectedBrand} inputValue={inputValue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 240,
    minHeight: IS_SMALL_SCREEN ? 340 : 300,
    paddingVertical: spaces.L,
  },
}); 