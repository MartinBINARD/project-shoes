import { ScrollView, StyleSheet, View } from "react-native";
import { colors } from "../../../constants/colors";
import { radius } from "../../../constants/radius";
import { spaces } from "../../../constants/spaces";
import TextBoldL from "../../../ui-components/texts/TextBoldL";
import TextMediumM from "../../../ui-components/texts/TextMediumM";

export default function Sizes({ sizes }) {
  return (
    <View style={styles.container}>
      <TextBoldL style={styles.title}>Tailles</TextBoldL>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.contentContainer}
      >
        {Array(9).fill(0).map((_, index) => (
          <View key={index} style={[styles.sizeContainer, sizes.includes(index + 37) ? styles.availableSizeContainer : styles.unavailableSizeContainer]}>
            <TextMediumM style={styles.sizeText}>{index + 37}</TextMediumM>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spaces.L
  },
  title: {
    marginLeft: spaces.L,
    marginBottom: spaces.M,
    color: colors.DARK
  },
  contentContainer: {
    paddingHorizontal: spaces.L
  },
  sizeContainer: {
    width: 60,
    height: 60,
    borderRadius: radius.FULL,
    marginRight: spaces.M,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginBottom: spaces.S
  },
  availableSizeContainer: {
    backgroundColor: colors.LIGHT,
    borderColor: colors.BLUE,
  },
  unavailableSizeContainer: {
    backgroundColor: colors.WHITE,
    borderColor: colors.GREY,
  },
  sizeText: {
    color: colors.DARK
  },
})