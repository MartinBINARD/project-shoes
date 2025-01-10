import { Formik } from 'formik';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';
import { colors } from '../../../constants/colors';
import { spaces } from '../../../constants/spaces';
import CustomButton from '../../../ui-components/buttons/CustomButton';
import Input from '../../../ui-components/inputs/Input';
import TextBoldM from '../../../ui-components/texts/TextBoldM';
import TextMediumM from '../../../ui-components/texts/TextMediumM';

export default function AuthForm() {
    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("L'email est incorrect").required("L'email est obligatoire"),
        password: Yup.string().min(6, 'Le mot de passe doit faire au moins 6 caractères').required('Le mot de passe est obligatoire'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Les mots de passes ne correspondent pas')
            .required('Les mots de passes ne correspondent pas'),
    });

    return (
        <View style={styles.formContainer}>
            <Formik initialValues={initialValues} onSubmit={(values) => console.log(values)} validationSchema={validationSchema}>
                {({ values, handleChange, handleSubmit, errors, touched, handleBlur }) => (
                    <>
                        <Input
                            label="Email"
                            maxLength={60}
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            error={!!errors.email && touched.email}
                            errorText={errors.email}
                            autoCapitalize="none"
                        />
                        <Input
                            label="Mot de passe"
                            maxLength={60}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            error={!!errors.password && touched.password}
                            errorText={errors.password}
                            autoCapitalize="none"
                            type="password"
                        />
                        <Input
                            label="Confirmation du mot de passe"
                            maxLength={60}
                            value={values.confirmPassword}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            error={!!errors.confirmPassword && touched.confirmPassword}
                            errorText={errors.confirmPassword}
                            autoCapitalize="none"
                            type="password"
                        />
                        <CustomButton text="Valider" onPress={handleSubmit} />
                    </>
                )}
            </Formik>
            <TouchableOpacity activeOpacity={0.8} onPress={() => console.log('navigate to login')} style={styles.switchAuthContainer}>
                <TextMediumM>Vous avez déjà un compte ?</TextMediumM>
                <TextBoldM>Connectez-vous</TextBoldM>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        padding: spaces.L,
        backgroundColor: colors.LIGHT,
        justifyContent: 'center',
    },
    switchAuthContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: spaces.XL,
    },
});
