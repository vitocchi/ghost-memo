export const initializeEnigma = (enigmaClient) => {
    return {
        type: 'ENIGMA_INITIALIZED',
        payload: enigmaClient
    };
};

export const signIn = (account) => {
    return {
        type: 'SIGN_IN',
        payload: account,
    }
}

export const signOut = () => {
    return {
        type: 'SIGN_OUT',
        payload: null,
    }
}

export const setMemo = (memo) => {
    return {
        type: 'SET_MEMO',
        payload: memo,
    }
}

export const notifyMessage = (notification) => {
    return {
        type: 'MESSAGE_NOTIFIED',
        payload: notification
    };
};