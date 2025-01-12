import { useEffect } from 'react';
import { useCreateUserMutation } from '../../store/api/userApi';
import AuthForm from './components/AuthForm';

export default function Signup({ navigation }) {
    const [createUser, { isLoading, isSuccess }] = useCreateUserMutation();
    const navigateToLogin = () => {
        navigation.replace('Login');
    };
    const submitFormHandler = (values) => {
        createUser({ email: values.email });
    };

    useEffect(() => {
        if (isSuccess) {
            navigation.replace('DrawerNavigator');
        }
    }, [isSuccess]);

    return <AuthForm navigate={navigateToLogin} submitFormHandler={submitFormHandler} isLoading={isLoading} />;
}
