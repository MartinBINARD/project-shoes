import { TouchableOpacity } from "react-native"
import { colors } from "../../constants/colors"

export default function Touchable({ styles, children}) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles}>{children}</TouchableOpacity>
  )
}