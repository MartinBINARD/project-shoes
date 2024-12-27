import { StyleSheet, View } from "react-native";
import { colors } from "../../../constants/colors";
import { spaces } from "../../../constants/spaces";
import TextBoldL from "../../../ui-components/texts/TextBoldL";
import TextBoldXL from "../../../ui-components/texts/TextBoldXL";
import TextMediumM from "../../../ui-components/texts/TextMediumM";

export default function DetailsDescription({ name, price, description }) {
  return (
    <View style={styles.descriptionContainer}>
      <View>
        <TextMediumM blue style={styles.textSpacing}>MEILLEUR CHOIX</TextMediumM>
        <TextBoldXL style={styles.textSpacing}>{name}</TextBoldXL>
      </View>
      <TextBoldL style={styles.textSpacing}>{price} €</TextBoldL>
      <TextMediumM style={styles.descriptionText}>{description}</TextMediumM>
    </View>
  );
}

const styles = StyleSheet.create({
  descriptionContainer: {
    paddingHorizontal: spaces.L
  },
  textSpacing: {
    marginBottom: spaces.S
  },
  descriptionText: {
    color: colors.GREY
  }
})