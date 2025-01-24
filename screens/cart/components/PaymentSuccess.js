import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../../constants/colors';
import { radius } from '../../../constants/radius';
import { ICON_SIZE } from '../../../constants/sizes';
import { spaces } from '../../../constants/spaces';
import CustomButton from '../../../ui-components/buttons/CustomButton';
import TextBoldM from '../../../ui-components/texts/TextBoldM';

export default function PaymentSuccess({ onPress }) {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Ionicons name="checkmark-done-circle-sharp" size={ICON_SIZE} color={colors.BLUE} style={styles.icon} />
                <View style={styles.text}>
                    <TextBoldM>Merci pour votre commande</TextBoldM>
                </View>
                <CustomButton text="OK" onPress={onPress} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '75%',
        minHeight: 160,
        padding: spaces.L,
        borderRadius: radius.REGULAR,
        borderWidth: 1,
        borderColor: colors.BLUE,
        backgroundColor: colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginVertical: spaces.XL,
    },
});
