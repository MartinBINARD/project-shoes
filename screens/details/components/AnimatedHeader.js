import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated';
import CartIcon from '../../../assets/images/navigation/cart.svg';
import { colors } from '../../../constants/colors';
import { radius } from '../../../constants/radius';
import { ICON_SIZE, SMALL_ICON_SIZE } from '../../../constants/sizes';
import { spaces } from '../../../constants/spaces';
import TextBoldM from '../../../ui-components/texts/TextBoldM';

const MAIN_WIDTH = 80;

export default function AnimatedHeader({ shouldAnimate, setShouldAnimate, cartCount }) {
    const naivagtion = useNavigation();
    const [count, setCount] = useState(cartCount);
    const animatedTranslate = useSharedValue(spaces.M + MAIN_WIDTH);
    const animatedScale = useSharedValue(1);

    const animatedContainerStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: animatedTranslate.value }],
    }));

    const animatedBadgeStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: -SMALL_ICON_SIZE / 2 }, { translateY: -SMALL_ICON_SIZE / 2 }, { scale: animatedScale.value }],
    }));

    useEffect(() => {
        if (shouldAnimate) {
            animatedTranslate.value = withTiming(spaces.M, { duration: 1000 }, () => {
                runOnJS(setCount)(cartCount);
                animatedScale.value = withRepeat(withSpring(1.5), 2, true, () => {
                    animatedTranslate.value = withTiming(
                        spaces.M + MAIN_WIDTH,
                        {
                            duration: 1000,
                        },
                        () => {
                            runOnJS(setShouldAnimate)(false);
                        },
                    );
                });
            });
        }
    }, [shouldAnimate]);

    useEffect(() => {
        naivagtion.setOptions({
            headerRight: () => (
                <Animated.View style={[styles.container, animatedContainerStyle]}>
                    <CartIcon width={ICON_SIZE} height={ICON_SIZE} color={colors.WHITE} />
                    <Animated.View style={[styles.badge, animatedBadgeStyle]}>
                        <TextBoldM blue>{count}</TextBoldM>
                    </Animated.View>
                </Animated.View>
            ),
        });
    }, [count]);

    return null;
}

const styles = StyleSheet.create({
    container: {
        width: MAIN_WIDTH,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: radius.REGULAR,
        borderBottomLeftRadius: radius.REGULAR,
        backgroundColor: colors.BLUE,
    },
    badge: {
        width: SMALL_ICON_SIZE,
        height: SMALL_ICON_SIZE,
        position: 'absolute',
        top: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radius.FULL,
        backgroundColor: colors.WHITE,
    },
});
