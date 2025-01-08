import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../constants/colors';
import { radius } from '../../../constants/radius';
import { spaces } from '../../../constants/spaces';
import TextBoldL from '../../../ui-components/texts/TextBoldL';
import TextMediumM from '../../../ui-components/texts/TextMediumM';

export default function Sizes({ sizes, selectedSize, setSelectedSize }) {
    return (
        <View style={styles.container}>
            <TextBoldL style={styles.title}>Tailles</TextBoldL>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.contentContainer}>
                {Array(9)
                    .fill(0)
                    .map((_, index) => (
                        <TouchableOpacity
                            onPress={() => {
                                if (sizes.includes(index + 37)) {
                                    setSelectedSize(index + 37);
                                }
                            }}
                            activeOpacity={0.8}
                            key={index}
                            style={[
                                styles.sizeContainer,
                                selectedSize === index + 37
                                    ? styles.selectedSizeContainer
                                    : sizes.includes(index + 37)
                                      ? styles.availableSizeContainer
                                      : styles.unavailableSizeContainer,
                            ]}
                        >
                            <TextMediumM style={[selectedSize === index + 37 ? styles.selectedSizeText : styles.sizeText]}>
                                {index + 37}
                            </TextMediumM>
                        </TouchableOpacity>
                    ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: spaces.L,
    },
    title: {
        marginLeft: spaces.L,
        marginBottom: spaces.M,
        color: colors.DARK,
    },
    contentContainer: {
        paddingHorizontal: spaces.L,
    },
    sizeContainer: {
        width: 60,
        height: 60,
        borderRadius: radius.FULL,
        marginRight: spaces.M,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginBottom: spaces.S,
    },
    selectedSizeContainer: {
        backgroundColor: colors.BLUE,
        borderColor: colors.BLUE,
        elevation: 4,
        shadowColor: colors.DARK,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },
    availableSizeContainer: {
        backgroundColor: colors.LIGHT,
        borderColor: colors.BLUE,
    },
    unavailableSizeContainer: {
        backgroundColor: colors.WHITE,
        borderColor: colors.GREY,
    },
    sizeText: {
        color: colors.DARK,
    },
    selectedSizeText: {
        color: colors.WHITE,
    },
});
