import { AntDesign } from "@expo/vector-icons";
import { Image, Platform, StyleSheet, View } from "react-native";
import { colors } from "../../../../constants/colors";
import { radius } from "../../../../constants/radius";
import { spaces } from "../../../../constants/spaces";
import TextBoldL from "../../../../ui-components/texts/TextBoldL";
import TextMediumM from "../../../../ui-components/texts/TextMediumM";
import TextMediumS from "../../../../ui-components/texts/TextMediumS";
import Touchable from "../../../../ui-components/touchable/Touchable"
import { IS_LARGE_SCREEN, SCREEN_WIDTH } from "../../../../constants/sizes";

export default function VerticalCard({ item }) {
  return (
    <View style={styles.container}>
      <Touchable style={styles.touchableContainer}>
        <View style={styles.touchableContainer}>
          <View style={styles.imageContainer}>
            <Image source={item.items[0].image} style={styles.image} />
          </View>
          <View style={styles.descriptionContainer}>
            <View>
              <TextMediumS blue>TOP VENTE</TextMediumS>
              <TextBoldL style={styles.itemName}>{item.name}</TextBoldL>
            </View>
            <TextMediumM>{item.price} €</TextMediumM>
          </View>
          <View style={styles.btn}>
            <AntDesign name="plus" size={24} color={colors.WHITE} />
          </View>
        </View>
      </Touchable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: IS_LARGE_SCREEN ? SCREEN_WIDTH / 3.5 : 180,
    height: Platform.select({ ios: "100%", android: "98%"}),
    backgroundColor: colors.WHITE,
    borderRadius: radius.REGULAR,
    padding: spaces.S,
    elevation: 4,
    shadowColor: colors.DARK,
    shadowOpaccity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    paddingVertical: 2,
  },
  touchableContainer: {
    width: "100%",
    height: "100%",
    padding: spaces.S,
    paddingVertical: 2,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spaces.S,
  },
  image: {
    width: "100%",
    height: "100%",
    transform: [
      { rotate: "-20deg" },
      { translateX: -spaces.S },
      { translateY: -spaces.S },
    ],
  },
  descriptionContainer: {
    flex: IS_LARGE_SCREEN ? 0.7 : 0.2,
    justifyContent: "space-between",
    padding: spaces.S,
  },
  itemName: {
    marginTop: spaces.S,
  },
  btn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.BLUE,
    borderTopLeftRadius: radius.REGULAR,
    borderBottomRightRadius: radius.REGULAR,
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    height: 36,
  },
});