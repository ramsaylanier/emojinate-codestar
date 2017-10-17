import {createError} from 'apollo-errors';

export const NoTokenError = createError('NoTokenError', {
  message: 'Please log in. (code 1001)',
});
