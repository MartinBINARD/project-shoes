import { StyleSheet, Text, View } from "react-native";

export default function Notfications() {
  return(
    <View style={styles.container}>
      <Text>Notifications</Text>
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