import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { colors } from "../../constants/colors";
import { radius } from "../../constants/radius";
import { IS_LARGE_SCREEN } from "../../constants/sizes";
import { spaces } from "../../constants/spaces";
import CustomButton from "../../ui-components/buttons/CustomButton";
import ListItemSeparator from "../../ui-components/separators/ListItemSeparator";
import TextBoldL from "../../ui-components/texts/TextBoldL";
import TextBoldXL from "../../ui-components/texts/TextBoldXL";
import ListItem from "./components/ListItem";

export default function Cart() {
  const state = useSelector(state => state.cart);
  const { shoes, totalAmount } = state;

  if (shoes.length === 0) {
    return (
      <View style={styles.listEmptyContainer}>
        <TextBoldL>Votre panier est vide</TextBoldL>
      </View>
    );
  }

  return(
    <View style={styles.container}>
      <FlatList
        data={shoes}
        showsVerticalScrollIndicator={false}
        keyExtractor={({ id }) => id}
        renderItem={({item}) => <ListItem item={item} />}
        style={styles.listContainer}
        ItemSeparatorComponent={<ListItemSeparator height={spaces.L} />}
        numColumns={IS_LARGE_SCREEN ? 2 : 1}
      />
      
      <View style={styles.priceContainer}>
        <View style={styles.rowContainer}>
          <TextBoldXL>Sous total</TextBoldXL>
          <TextBoldXL>{totalAmount} €</TextBoldXL>
        </View>

        <View style={styles.rowContainer}>
          <TextBoldXL>Frais de port</TextBoldXL>
          <TextBoldXL>{Math.floor(totalAmount / 15)} €</TextBoldXL>
        </View>

        <View style={styles.dashedLine} />
        <View style={styles.rowContainer}>
          <TextBoldXL>Total</TextBoldXL>
          <TextBoldXL>{ totalAmount + Math.floor(totalAmount / 15)} €</TextBoldXL>
        </View>
        <CustomButton text="Passer la commande" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  listEmptyContainer: {
    flex: 1,
    backgroundColor: colors.LIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    backgroundColor: colors.LIGHT,
  },
  listContainer: {
    marginTop: spaces.M
  },
  priceContainer: {
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: radius.REGULAR,
    borderTopRightRadius: radius.REGULAR,
    padding: spaces.XL
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spaces.M
  },
  dashedLine: {
    borderWidth: 1,
    borderColor: colors.GREY,
    borderStyle: "dashed",
    marginBottom: spaces.M
  }
})