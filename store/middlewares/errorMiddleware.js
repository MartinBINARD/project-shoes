import { isRejectedWithValue } from '@reduxjs/toolkit';
import { setHttpError, setHttpErrorMessage } from '../slices/errorSlice';

const errorMessages = {
    EMAIL_EXISTS: 'Cet email est déjà utilisé',
    INVALID_LOGIN_CREDENTIALS: 'Ces identifiants sont incorrects',
};

export const rtkQueryErrorMiddleware = (api) => (next) => (action) => {
    console.log(action.payload);

    if (isRejectedWithValue(action)) {
        api.dispatch(
            setHttpErrorMessage(
                errorMessages[action.payload.data?.error.message] || 'Une erreur est survenue. Veuillez ré-essayer ultérieurement',
            ),
        );
        api.dispatch(setHttpError(true));
    }
    return next(action);
};
