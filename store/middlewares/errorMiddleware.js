import { isRejectedWithValue } from '@reduxjs/toolkit';
import { setHttpError } from '../slices/errorSlice';

export const rtkQueryErrorMiddleware = (api) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        api.dispatch(setHttpError(true));
    }
    return next(action);
};
