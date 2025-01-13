import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLazyGetUserQuery } from '../../store/api/userApi';
import { setUserId } from '../../store/slices/userSlice';
import AuthForm from './components/AuthForm';

export default function Login({ navigation }) {
    const dispatch = useDispatch();
    const [getUser, { data, isFetching }] = useLazyGetUserQuery();
    const navigateToSignup = () => {
        navigation.replace('Signup');
    };
    const submitFormHandler = (values) => {
        getUser({ email: values.email });
    };

    useEffect(() => {
        if (data?.id) {
            dispatch(setUserId(data.id));
            navigation.replace('DrawerNavigator');
        }
    }, [data]);
    return <AuthForm loginScreen navigate={navigateToSignup} submitFormHandler={submitFormHandler} isLoading={isFetching} />;
}
