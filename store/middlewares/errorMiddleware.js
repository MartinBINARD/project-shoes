import { isRejectedWithValue } from '@reduxjs/toolkit';
import { setErrorHttp } from '../slices/errorSlice';

export const rtkQueryErrorMiddleware = (api) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        api.dispatch(setErrorHttp(true));
    }
    return next(action);
};
