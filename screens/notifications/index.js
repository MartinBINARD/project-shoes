import { FlatList, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { spaces } from "../../constants/spaces";
import { shoes } from "../../data/shoes";
import ListItemSeparator from "../../ui-components/separators/ListItemSeparator";
import ListItem from "./components/Listitem";

const ids = ["nik43p", "nik47p", "nik64p" ];

export default function Notfications({ navigation }) {
  const data = ids.map((id) => 
    shoes
      .find((item) => item.stock.find((elem) => elem.id === id))
      .stock.find((item) => item.id === id)
  );

  const navigateToDetails = (id) => navigation.navigate("Details", { id });

  const renderItem = ({ item }) => <ListItem item={item} navigateToDetails={navigateToDetails} />

  return(
    <FlatList 
      style={styles.container}
      data={data}
      keyExtractor={({ id}) => id}
      ItemSeparatorComponent={<ListItemSeparator height={spaces.L}/>}
      renderItem={renderItem}
     />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT,
    paddingTop: spaces.L
  }
})