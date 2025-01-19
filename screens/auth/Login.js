import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSignMutation } from '../../store/api/authApi';
import { setToken, setUserId } from '../../store/slices/authSlice';
import AuthForm from './components/AuthForm';

export default function Login({ navigation }) {
    const dispatch = useDispatch();
    const [signIn, { data, isLoading, error }] = useSignMutation();

    const navigateToSignup = () => {
        navigation.replace('Signup');
    };
    const submitFormHandler = (values) => {
        signIn({
            email: values.email,
            password: values.password,
            endpoint: 'signInWithPassword',
        });
    };

    useEffect(() => {
        if (data) {
            dispatch(setUserId(data.localId));
            dispatch(setToken(data.idToken));
            SecureStore.setItemAsync('refreshToken', data.refreshToken);
        }
    }, [data]);

    return <AuthForm loginScreen navigate={navigateToSignup} submitFormHandler={submitFormHandler} isLoading={isLoading} />;
}
