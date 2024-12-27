import { TouchableNativeFeedback } from "react-native"
import { colors } from "../../constants/colors"

export default function Touchable({ styles, children, onPress, color = colors.LIGHT }) {
  return (
    <TouchableNativeFeedback 
      style={styles}
      background={TouchableNativeFeedback.Ripple(color , true)} onPress={onPress}
    >
      {children}
    </TouchableNativeFeedback>
  )
}