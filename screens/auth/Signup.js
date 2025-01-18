import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSignMutation } from '../../store/api/authApi';
import { setToken } from '../../store/slices/authSlice';
import AuthForm from './components/AuthForm';

export default function Signup({ navigation }) {
    const dispatch = useDispatch();
    const [signUp, { data, isLoading, error }] = useSignMutation();
    // const [createUser, { data, isLoading, isSuccess }] = useCreateUserMutation();
    const navigateToLogin = () => {
        navigation.replace('Login');
    };
    const submitFormHandler = (values) => {
        signUp({
            email: values.email,
            password: values.password,
            endpoint: 'signUp',
        });
        // createUser({ email: values.email });
    };

    useEffect(() => {
        if (data) {
            dispatch(setToken(data.idToken));
            // dispatch(setUserId(data.id));
        }
    }, [data]);

    return <AuthForm navigate={navigateToLogin} submitFormHandler={submitFormHandler} isLoading={isLoading} />;
}
