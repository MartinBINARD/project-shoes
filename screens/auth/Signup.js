import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSignMutation } from '../../store/api/authApi';
import { useCreateUserMutation } from '../../store/api/userApi';
import { setToken, setUserId } from '../../store/slices/authSlice';
import AuthForm from './components/AuthForm';

export default function Signup({ navigation }) {
    const dispatch = useDispatch();
    const [signUp, { data, isLoading, error }] = useSignMutation();
    const [createUser, { data: user, isCreating }] = useCreateUserMutation();
    const navigateToLogin = () => {
        navigation.replace('Login');
    };
    const submitFormHandler = async (values) => {
        const response = await signUp({
            email: values.email,
            password: values.password,
            endpoint: 'signUp',
        });
        if (!response.error) {
            createUser({
                user: { email: values.email },
                token: response.data.idToken,
                id: response.data.localId,
            });
        }
    };

    useEffect(() => {
        if (data && user) {
            dispatch(setToken(data.idToken));
            dispatch(setUserId(data.localId));
            SecureStore.setItemAsync('refreshToken', data.refreshToken);
        }
    }, [data, user]);

    return <AuthForm navigate={navigateToLogin} submitFormHandler={submitFormHandler} isLoading={isLoading || isCreating} />;
}
