import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { colors } from '../../../constants/colors';
import { radius } from '../../../constants/radius';
import { SMALL_ICON_SIZE } from '../../../constants/sizes';
import { spaces } from '../../../constants/spaces';

const ProfilePicture = ({ image, setImage }) => {
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.5,
        });

        if (!result.canceled) {
            setImage({ uri: result.assets[0].uri, new: true });
        }
    };
    return (
        <View style={styles.container}>
            <Pressable style={styles.imageContainer} onPress={pickImage}>
                {image?.uri ? (
                    <Image source={{ uri: image.uri }} style={styles.image} />
                ) : (
                    <FontAwesome name="user-circle" size={90} color={colors.BLUE} />
                )}

                <View style={styles.iconContainer}>
                    <MaterialIcons name="enhance-photo-translate" size={SMALL_ICON_SIZE / 2} color={colors.WHITE} />
                </View>
            </Pressable>
        </View>
    );
};

export default ProfilePicture;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginBottom: spaces.XL,
    },
    imageContainer: {
        width: 90,
        height: 90,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: radius.FULL,
        borderWidth: 1,
        borderColor: colors.DARK,
    },
    iconContainer: {
        position: 'absolute',
        bottom: 0,
        width: SMALL_ICON_SIZE,
        height: SMALL_ICON_SIZE,
        left: '50%',
        transform: [{ translateX: -SMALL_ICON_SIZE / 2 }, { translateY: SMALL_ICON_SIZE / 2 }],
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.BLUE,
        borderRadius: radius.FULL,
    },
});
