import { useEffect } from 'react';
import { useLazyGetUserQuery } from '../../store/api/userApi';
import AuthForm from './components/AuthForm';

export default function Login({ navigation }) {
    const [getUser, { data, isFetching }] = useLazyGetUserQuery();
    const navigateToSignup = () => {
        navigation.replace('Signup');
    };
    const submitFormHandler = (values) => {
        getUser({ email: values.email });
    };

    console.log(data);

    useEffect(() => {
        if (data?.id) {
            navigation.replace('DrawerNavigator');
        }
    }, [data]);
    return <AuthForm loginScreen navigate={navigateToSignup} submitFormHandler={submitFormHandler} isLoading={isFetching} />;
}
