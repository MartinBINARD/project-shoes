import AuthForm from './components/AuthForm';

export default function Signup({ navigation }) {
    const navigateToLogin = () => {
        navigation.replace('Login');
    };
    return <AuthForm navigate={navigateToLogin} />;
}
