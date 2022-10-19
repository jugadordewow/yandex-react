import {
    FORGOT_PSWD_REQUEST,
    FORGOT_PSWD_SUCCESS,
    FORGOT_PSWD_FAILED,
    RESET_PSWD_REQUEST,
    RESET_PSWD_SUCCESS,
    RESET_PSWD_FAILED,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    USER_DATA_SUCCESS,
    USER_DATA_FAILED,
    AUTH_TOKEN_REQUEST,
    AUTH_TOKEN_SUCCESS,
    AUTH_TOKEN_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED
} from '../actions/auth';

const initialState = {
    userName:'',
    userEmail:'',

    loginRequest: false,
    loginFailed: false,

    logoutRequest: false,
    logoutFailed: false,

    forgotPswdRequest: false,
    forgotPswdFailed: false,

    resetPswdRequest: false,
    resetPswdFailed: false,

    authRequest: false,
    authFailed: false,

    tokenRequest: false,
    tokenFailed: false,
};

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case FORGOT_PSWD_REQUEST: {
            return {...state, forgotPswdRequest: true}
        }
        case FORGOT_PSWD_SUCCESS: {
            return {...state, forgotPswdRequest: false}
        }
        case FORGOT_PSWD_FAILED: {
            return {...state, forgotPswdFailed: true}
        }
        default: {
             return state;
        }
    }
}

