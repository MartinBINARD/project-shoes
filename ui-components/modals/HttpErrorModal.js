import { Modal, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { SCREEN_HEIGHT } from '../../constants/sizes';
import { spaces } from '../../constants/spaces';
import CustomButton from '../buttons/CustomButton';
import TextBoldL from '../texts/TextBoldL';

export default function HttpErrorModal({ isModalVisible, closeModal }) {
    const errorMessage = useSelector((state) => state.error.httpErrorMessage);

    return (
        <Modal visible={isModalVisible} animationType="slide" transparent>
            <View style={styles.container}>
                <TextBoldL style={styles.text}>{errorMessage}</TextBoldL>
                <CustomButton onPress={closeModal} text="OK" />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        minHeight: SCREEN_HEIGHT / 2.5,
        backgroundColor: colors.GREY,
        borderTopLeftRadius: radius.REGULAR,
        borderTopRightRadius: radius.REGULAR,
        padding: spaces.L,
        borderColor: colors.GREY,
        borderWidth: 2,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        color: colors.LIGHT,
    },
});
