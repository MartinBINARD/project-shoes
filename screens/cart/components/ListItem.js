import Feather from '@expo/vector-icons/Feather';
import { Image, Pressable, StyleSheet, View } from "react-native";
import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { ICON_SIZE } from "../../../constants/sizes";
import { spaces } from "../../../constants/spaces";
import TextBoldL from "../../../ui-components/texts/TextBoldL";
import TextBoldM from "../../../ui-components/texts/TextBoldM";
import TextBoldXL from "../../../ui-components/texts/TextBoldXL";

export default function ListItem ({ item }) {
  return (
    <View style={StyleSheet.container}>
      <View style={styles.leftContainer}>
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
        </View>
        <View style={styles.columnContainer}>
          <TextBoldL>{item.name}</TextBoldL>
          <TextBoldL>{item.price} €</TextBoldL>
          <View style={styles.quantityContainer}>
            <Pressable style={[styles.operationSignContainer, styles.substractSignContainer]}>
              <TextBoldXL>-</TextBoldXL>
            </Pressable>
            <TextBoldM style={styles.quantityText}>{item.quantity}</TextBoldM>
            <Pressable style={[styles.operationSignContainer, styles.addSignContainer]}>
              <TextBoldXL>+</TextBoldXL>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={[styles.rightContainer, styles.columnContainer]}>
        <TextBoldL>{item.size}</TextBoldL>
        <Feather name="trash-2" size={ICON_SIZE} color={colors.GREY} suppressHighlighting={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flexDirection: "row",
    width: "100%",
    height: 140,
    justifyContent: "space-between",
    paddingVertical: spaces.XS,
    paddingHorizontal: spaces.L
  },
  leftContainer: {
    flexDirection: "row",
  },
  imageContainer: {
    width: 120,
    height: "100%",
    backgroundColor: colors.WHITE,
    borderRadius: radius.REGULAR,
    marginRight: spaces.L
  },
  image: {
    width: 120,
    height: 120,
    transform: [
      { rotate: "-20deg" },
      { translateX: -spaces.S },
      { translateY: -spaces.S }
    ]
  },
  columnContainer: {
    justifyContent: "space-between",
    paddingVertical: spaces.M
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  operationSignContainer: {
    width: spaces.XL,
    height: spaces.XL,
    borderRadius: radius.FULL,
    justifyContent: "center",
    alignItems: "center"
  },
  substractSignContainer: {
    backgroundColor: colors.WHITE
  },
  addSignContainer: {
    backgroundColor: colors.BLUE
  },
  quantityText: {
    marginHorizontal: spaces.M,
  },
  rightContainer: {
    alignItems: "center"
  }
});