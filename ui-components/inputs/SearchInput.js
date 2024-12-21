import { EvilIcons } from "@expo/vector-icons";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import { colors } from "../../constants/colors";
import { radius } from "../../constants/radius";
import { IS_SMALL_SCREEN } from "../../constants/sizes";
import { spaces } from "../../constants/spaces";
import { textSize } from "../../constants/textSize";

export default function SearchInput({ placeholder, value, onChangeText }) {
  return (
    <View style={styles.inputContainer}>
      <EvilIcons
        name="search"
        size={32}
        color={colors.GREY}
        style={styles.searchIcon}
      />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.WHITE,
    marginHorizontal: spaces.L,
    borderRadius: radius.FULL,
    height: IS_SMALL_SCREEN ? 44 : 50,
    maxWidth: 360,
  },
  searchIcon: {
    marginHorizontal: spaces.M,
    marginBottom: Platform.select({ android: spaces.XS, ios: 0}),
  },
  input: {
    flex: 1,
    paddingVertical: spaces.S,
    paddingRight: spaces.S,
    color: colors.GREY,
    fontFamily: "Regular",
    fontSize: textSize.M,
  },
});