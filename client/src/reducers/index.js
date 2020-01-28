import { combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';

const enigmaReducer = (enigma = null, action) => {
    if (action.type === 'ENIGMA_INITIALIZED') {
        return action.payload;
    }

    return enigma;
};

const accountReducer = (account = null, action) => {
    if (action.type === 'SIGN_IN') {
        return action.payload;
    }
    if (action.type === 'SIGN_OUT') {
        return null;
    }

    return account;
}

const memoReducer = (memo = '', action) => {
    if (action.type === 'SET_MEMO') {
        return action.payload;
    }
    if (action.type === 'SIGN_OUT') {
        return '';
    }

    return memo;
}

const notificationReducer = (notification = {open: false, message: ''}, action) => {
    if (action.type === 'MESSAGE_NOTIFIED') {
        return action.payload;
    }

    return notification;
};
export default combineReducers({
    enigma: enigmaReducer,
    account: accountReducer,
    memo: memoReducer,
    notification: notificationReducer,
    form: formReducer,
});
