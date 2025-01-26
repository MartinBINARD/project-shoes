import { useDrawerProgress } from '@react-navigation/drawer';
import { Platform, StyleSheet } from 'react-native';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { radius } from '../../constants/radius';
import { SCREEN_WIDTH } from '../../constants/sizes';

export default function AnimatedScreenWrapper({ children }) {
    const progress = useDrawerProgress();

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: interpolate(progress.value, [0, 1], [1, 0.7]),
            },
            {
                rotate: `${interpolate(progress.value, [0, 1], [0, -5])}deg`,
            },
            {
                translateX: interpolate(progress.value, [0, 1], [0, Platform.OS === 'android' ? SCREEN_WIDTH - 40 : -20]),
            },
        ],
        borderRadius: interpolate(progress.value, [0, 1], [0, radius.REGULAR]),
        overflow: 'hidden',
    }));
    return <Animated.View style={[styles.container, animatedStyle]}>{children}</Animated.View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
