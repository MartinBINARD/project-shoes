import { StyleSheet, TouchableOpacity, View } from "react-native";
import { spaces } from "../../../constants/spaces";
import TextBoldL from "../../../ui-components/texts/TextBoldL";
import TextMediumM from "../../../ui-components/texts/TextMediumM";

export default function Banner({ text }) {
  const onPress = () => {};   // Nous implémenterons cette fonction dans un futur chapitre
  return (
    <View style={styles.container}>
      <TextBoldL>{text}</TextBoldL>
      <TouchableOpacity onPress={onPress}>
        <TextMediumM blue>Voir tout</TextMediumM>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: spaces.L,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spaces.M,
  },
});