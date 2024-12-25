import { Text, View } from "react-native";
import { shoes } from "../../data/shoes";

export default function NewsList() {
  const items = shoes.map((brand) => {
    return brand.stock.filter((item) => item.new);
  });
  console.log(items);
  return (
    <View>
      <Text>List</Text>
    </View>
  );
}