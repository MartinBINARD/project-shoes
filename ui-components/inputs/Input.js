import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../../constants/colors';
import { radius } from '../../constants/radius';
import { spaces } from '../../constants/spaces';
import TextBoldL from '../texts/TextBoldL';
import TextMediumM from '../texts/TextMediumM';

export default function Input({ label, error, errorText, type, ...inputProps }) {
    const [isPassWordVisible, setisPasswordVisible] = useState(false);
    const inputContainerStyle = [styles.inputContainer];
    if (error) {
        inputContainerStyle.push(styles.inputError);
    }

    const togglePasswordVisibility = () => {
        setisPasswordVisible((prev) => !prev);
    };

    return (
        <View style={styles.container}>
            <TextBoldL style={styles.label}>{label}</TextBoldL>
            <View style={inputContainerStyle}>
                <TextInput style={styles.input} secureTextEntry={type === 'password' && !isPassWordVisible} {...inputProps} />
                {type === 'password' ? (
                    <Feather
                        name={isPassWordVisible ? 'eye' : 'eye-off'}
                        size={24}
                        color={colors.DARK}
                        onPress={togglePasswordVisibility}
                    />
                ) : null}
            </View>
            <View style={styles.errorContainer}>
                {error && errorText ? <TextMediumM style={styles.error}>{errorText}</TextMediumM> : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: spaces.L,
    },
    label: {
        marginBottom: 4,
    },
    inputContainer: {
        width: '100%',
        height: 54,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radius.REGULAR,
        backgroundColor: colors.WHITE,
        paddingHorizontal: spaces.M,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    inputError: {
        borderColor: colors.RED,
        borderWidth: 1,
    },

    errorContainer: {
        minHeight: spaces.L,
        justifyContent: 'center',
    },
    error: {
        color: colors.RED,
    },
});
