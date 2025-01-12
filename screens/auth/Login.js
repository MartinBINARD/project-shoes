import AuthForm from './components/AuthForm';

export default function Login({ navigation }) {
    const navigateToSignup = () => {
        navigation.replace('Signup');
    };
    return <AuthForm loginScreen navigate={navigateToSignup} />;
}
