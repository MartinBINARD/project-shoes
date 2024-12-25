import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";

export default function NewsList() {

  return (
    <View>
      <Text>NewsList</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.LIGHT,
  },
});