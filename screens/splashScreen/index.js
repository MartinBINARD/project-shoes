import LottieView from 'lottie-react-native';
import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

export default function SplashScreen({ appReadyHandler }) {
    return (
        <LottieView
            autoPlay
            loop={false}
            speed={0.5}
            source={require('../../assets/splash/animation.json')}
            onAnimationFinish={appReadyHandler}
            style={styles.animation}
        />
    );
}

const styles = StyleSheet.create({
    animation: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.LIGHT,
    },
});
