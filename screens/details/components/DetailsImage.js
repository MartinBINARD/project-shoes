import { Image, Platform, StyleSheet, View } from 'react-native';
import { SCREEN_WIDTH } from '../../../constants/sizes';
import { spaces } from '../../../constants/spaces';

export default function DetailsImage({ source }) {
    return (
        <View style={styles.imageContainer}>
            <Image source={source} style={styles.image} />
            <Image source={require('../../../assets/images/details/shoes-stand.png')} style={styles.imageStand} />
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        position: 'relative',
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH,
        alignItems: 'center',
    },
    image: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH,
        resizeMode: 'center',
        transform: [{ rotate: '-20deg' }, { translateX: -spaces.M }, { translateY: -spaces.S }],
    },
    imageStand: {
        position: 'absolute',
        bottom: Platform.select({ android: 40, ios: 70 }),
    },
});
