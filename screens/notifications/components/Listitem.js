import { Image, StyleSheet, View } from "react-native";
import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { spaces } from "../../../constants/spaces";
import TextBoldL from "../../../ui-components/texts/TextBoldL";
import TextBoldM from "../../../ui-components/texts/TextBoldM";
import TextMediumM from "../../../ui-components/texts/TextMediumM";
import TextMediumS from "../../../ui-components/texts/TextMediumS";
import Touchable from "../../../ui-components/touchable/Touchable";

export default function ListItem({ item, navigateToDetails }) {
  return (
    <View style={styles.container}>
      <Touchable color={colors.BLUE} onPress={() => navigateToDetails(item.id)}>
        <View style={styles.itemContainer}>
          <View style={styles.imageContainer}>
            <Image source={item.items[0].image} style={styles.image} />
          </View>

          <View style={styles.textContainer}>
            <TextBoldM>Nouvelle offre</TextBoldM>
            <TextMediumM>{item.name}</TextMediumM>
            <TextBoldL>{item.price}</TextBoldL>
          </View>

          <View>
            <TextMediumS>Il y a 2 jours</TextMediumS>
            <View style={styles.dot} />
          </View>
        </View>
      </Touchable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    borderWidth: 1,
    borderColor: "transparent"
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spaces.XS,
    paddingHorizontal: spaces.L
  },
  imageContainer: {
    width: 120,
    height: "100%"
  },
  image: {
    width: 120,
    height: 120,
    transform: [
      {rotate: "-20deg"},
      {translateX: -spaces.S},
      {translateY: -spaces.S},
    ]
  },
  textContainer: {
    justifyContent: "space-evenly",
    paddingVertical: spaces.S
  },
  dot: {
    width: spaces.S,
    height: spaces.S,
    borderRadius: radius.FULL,
    backgroundColor: colors.BLUE,
    marginTop: spaces.M,
    alignSelf: "flex-end"
  }
})