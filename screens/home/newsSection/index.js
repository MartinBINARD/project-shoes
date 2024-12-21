import { StyleSheet, useWindowDimensions, View } from "react-native";
import { IS_LARGE_SCREEN } from "../../../constants/sizes";
import { spaces } from "../../../constants/spaces";
import { shoes } from "../../../data/shoes";
import Banner from "../components/Banner";
import HorizontalCard from "./components/HorizontalCard";

export default function NewsSection({ selectedBrand }) {
  const { height } = useWindowDimensions();
  const landscapeStyle = {
    flex: 160,
    minHeight: 240,
  }

  const item = shoes
    .find((elem) => elem.brand === selectedBrand)
    .stock.find((elem) => elem.new);
  return (
    <View style={height < 400 ? landscapeStyle : styles.container}>
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