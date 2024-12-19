import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { spaces } from "../../../constants/spaces";
import SearchInput from "../../../ui-components/inputs/SearchInput";

export default function SearchSection() {
  const [inputValue, setInputValue] = useState("");
  return (
    <View style={styles.container}>
      <SearchInput
        placeholder="Trouvez vos shoes"
        value={inputValue}
        onChangeText={setInputValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flex: 120,
    paddingTop: spaces.S,
  },
});