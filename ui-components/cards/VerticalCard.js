import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image, Platform, StyleSheet, View } from "react-native";
import { colors } from "../../constants/colors";
import { radius } from "../../constants/radius";
import { IS_LARGE_SCREEN, SCREEN_WIDTH } from "../../constants/sizes";
import { spaces } from "../../constants/spaces";
import TextBoldL from "../texts/TextBoldL";
import TextMediumM from "../texts/TextMediumM";
import TextMediumS from "../texts/TextMediumS";
import Touchable from "../touchable/Touchable";

export default function VerticalCard({ item, listScreen = false }) {
  const navigation = useNavigation();
  const colors = item.items.map((elem) => elem.color);

  return (
    <View style={styles.container}>
      <Touchable style={styles.touchableContainer} onPress={() => navigation.navigate("Details")}>
        <View style={styles.touchableContainer}>
          <View style={styles.imageContainer}>
            <Image source={item.items[0].image} style={styles.image} />
          </View>
          <View style={[styles.descriptionContainer, { flex: listScreen ? 1 : IS_LARGE_SCREEN ? 0.7 : 0.2 }]}>
            <View>
              <TextMediumS blue>TOP VENTE</TextMediumS>
              <TextBoldL style={styles.itemName}>{item.name}</TextBoldL>
            </View>
            {listScreen ? (
              <View style={styles.bottomDescriptionContainer}>
                <View style={styles.priceContainer}>
                  <TextMediumM>{item.price} €</TextMediumM>
                </View>
                <View style={styles.colorsContainer}>
                  {colors.map(color => <View key={color} style={[styles.colorItem, { backgroundColor: color}]} />)}
                </View>
              </View>
            ) : <TextMediumM>{item.price} €</TextMediumM>}
          </View>
          {listScreen ? null : (
            <View style={styles.btn}>
              <AntDesign name="plus" size={24} color={colors.WHITE} />
            </View>
          )}
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
    justifyContent: "space-between",
    padding: spaces.S,
  },
  itemName: {
    marginTop: spaces.S,
  },
  bottomDescriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  priceContainer: {
    width: "50%"
  },
  colorsContainer: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "flex-end"
  },
  colorItem: {
    width: spaces.M,
    height: spaces.M,
    borderRadius: radius.FULL,
    marginHorizontal: spaces.XS,
    borderWidth: 1,
    borderColor: colors.GREY
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