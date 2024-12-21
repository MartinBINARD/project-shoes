import { StyleSheet, View } from "react-native";
import { spaces } from "../../../constants/spaces";
import { shoes } from "../../../data/shoes";
import Banner from "../components/Banner";
import HorizontalCard from "./components/HorizontalCard";
import { IS_LARGE_SCREEN } from "../../../constants/sizes";

export default function NewsSection({ selectedBrand }) {
  const item = shoes
    .find((elem) => elem.brand === selectedBrand)
    .stock.find((elem) => elem.new);
  return (
    <View style={styles.container}>
      <Banner text="Nouveautés" />
      <HorizontalCard item={item} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 160,
    minHeight: IS_LARGE_SCREEN ? 320 : 160,
    paddingVertical: spaces.M,
  },
});