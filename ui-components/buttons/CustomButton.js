import { StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import TextBoldL from '../texts/TextBoldL';

export default function CustomButton({ text, onPress }) {
    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.btnContainer} onPress={onPress}>
            <TextBoldL style={styles.btnText}>{text}</TextBoldL>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btnContainer: {
        backgroundColor: colors.BLUE,
        width: '100%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: radius.FULL,
    },
    btnText: {
        color: colors.WHITE,
    },
});
