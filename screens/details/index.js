import { ScrollView, StyleSheet, View } from "react-native";
import { SCREEN_HEIGHT } from "../../constants/sizes";
import { spaces } from "../../constants/spaces";
import { shoes } from "../../data/shoes";
import CustomButton from "../../ui-components/buttons/CustomButton";
import DetailsDescription from "./components/DetailsDescription";
import DeatilsImage from "./components/DetailsImage";
import Gallery from "./components/Gallery";
import Sizes from "./components/Sizes";

export default function Details() {
  const data = shoes[0].stock[0];
  const imageSource = data.items[0].image;
  const images = data.items.map(item => item.image);
  const sizes = data.items[0].sizes;

  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <DeatilsImage source={imageSource} />
          <DetailsDescription name={data.name} price={data.price} description={data.description} />
          <Gallery images={images} />
          <Sizes sizes={sizes} />
          <View style={styles.btnContainer}>
            <CustomButton text="Ajouter au panier" onPress={() => console.log("ajouter ua panier")}  />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: SCREEN_HEIGHT
  },
  container: {
    position: "relative",
    bottom: 120,
  },
  btnContainer: {
    width: "80%",
    alignSelf: "center",
    maxWidth: 400,
    marginVertical: spaces.XL
  }
})