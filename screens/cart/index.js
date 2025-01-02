import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function Cart() {
  const state = useSelector(state => state.cart);
  const { shoes, totalAmount } = state;
  return(
    <View style={styles.container}>
      <Text>Cart</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})