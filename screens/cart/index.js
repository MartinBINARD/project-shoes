import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { spaces } from "../../constants/spaces";
import { colors } from "../../constants/colors";
import ListItem from "./components/ListItem";
import ListItemSeparator from "../../ui-components/separators/ListItemSeparator";

export default function Cart() {
  const state = useSelector(state => state.cart);
  const { shoes, totalAmount } = state;
  return(
    <View style={styles.container}>
      <FlatList
        data={shoes}
        showsVerticalScrollIndicator={false}
        keyExtractor={(id) => id}
        renderItem={({item}) => <ListItem item={item} />}
        style={styles.listContainer}
        ItemSeparatorComponent={<ListItemSeparator height={spaces.L} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT,
  },
  listContainer: {
    marginTop: spaces.M
  }
})