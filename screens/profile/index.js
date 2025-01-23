import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { colors } from '../../constants/colors';
import { useGetUserByIdQuery, useUpdateUserMutation, useUploadUserPictureMutation } from '../../store/api/userApi';
import ProfileForm from './components/ProfileForm';

export default function Profile() {
    const [image, setImage] = useState({ uri: undefined, new: false });
    const { userId, token } = useSelector((state) => state.auth);
    const { data: user, isLoading } = useGetUserByIdQuery({ userId, token });
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
    const [uploadImage, { isLoading: isUploading }] = useUploadUserPictureMutation();

    const updateUserProfile = async (values) => {
        let imageResult;
        if (image.new) {
            imageResult = await uploadImage({ uri: image.uri, userId });
        }
        updateUser({
            userId,
            token,
            photoUrl: imageResult?.data ? imageResult.data : user.photoUrl,
            ...values,
        });
    };
    useEffect(() => {
        if (user?.photoUrl) {
            setImage({ uri: user.photoUrl, new: false });
        }
    }, [user]);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={colors.DARK} />
            </View>
        );
    }

    return (
        <ProfileForm
            user={user}
            isLoading={isUpdating || isUploading}
            submitFormHandler={updateUserProfile}
            image={image}
            setImage={setImage}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
