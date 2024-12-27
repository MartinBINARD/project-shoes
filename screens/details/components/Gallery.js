import { Image, StyleSheet, View } from "react-native";
import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { spaces } from "../../../constants/spaces";
import TextBoldL from "../../../ui-components/texts/TextBoldL";

export default function Gallery({images}) {
  return (
    <View style={styles.galleryContainer}>
      <TextBoldL>Galerie</TextBoldL>
      <View style={styles.imagesContainer}>
        {images.map(image => (
          <View style={styles.imageContainer} key={image}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles =StyleSheet.create({
  galleryContainer: {
    paddingHorizontal: spaces.L,
    marginTop: spaces.L
  },
  imagesContainer: {
    flexDirection: "row",
    marginTop: spaces.M
  },
  imageContainer: {
    width: 90,
    height: 90,
    backgroundColor: colors.LIGHT,
    borderRadius: radius.REGULAR,
    marginRight: spaces.M
  },
  image: {
    width: 90,
    height: 90,
    transform: [
      { rotate: "-20deg" },
      { translateX: -spaces.S },
      { translateY: -spaces.S },
    ],
  },
})