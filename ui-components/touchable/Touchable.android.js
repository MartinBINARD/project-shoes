import { TouchableNativeFeedback } from "react-native"
import { colors } from "../../constants/colors"

export default function Touchable({ styles, children}) {
  return (
    <TouchableNativeFeedback style={styles} background={TouchableNativeFeedback.Ripple(colors.LIGHT , true)}>{children}</TouchableNativeFeedback>
  )
}