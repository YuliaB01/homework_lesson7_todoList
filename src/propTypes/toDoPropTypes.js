import T from 'prop-types';

export const ToDoPropTypes = {
    id: T.string.isRequired,
    text: T.string.isRequired,
    isCompleted: T.bool,
    isImportant: T.bool
};