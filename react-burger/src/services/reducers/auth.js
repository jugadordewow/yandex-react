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
    USER_DATA_REQUEST,
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
        case RESET_PSWD_REQUEST: {
            return {...state, forgotPswdRequest: true}
        }
        case RESET_PSWD_SUCCESS: {
            return {...state, forgotPswdRequest: false}
        }
        case RESET_PSWD_FAILED: {
            return {...state, forgotPswdRequest: false, forgotPswdFailed: true}
        }
        case REGISTER_USER_REQUEST: {
            return { ...state, registerRequest:true}
        }
        case REGISTER_USER_SUCCESS: {
            return { ...state, registerRequest:false, userName: action.payload.name, userEmail: action.payload.email}
        }
        case REGISTER_USER_FAILED: {
            return { ...state, registerFailed:true }
        }
        case LOGIN_REQUEST: {
            return { ...state, loginRequest:true }
        }
        case LOGIN_SUCCESS: {
            return { ...state, loginFailed:false, loginRequest:false, userName:action.payload.name, userEmail:action.payload.email }
        }
        case LOGIN_FAILED: {
            return { ...state, loginFailed:true }
        }
        case LOGOUT_REQUEST: {
            return { ...state, logoutRequest:true };
        }
        case LOGOUT_SUCCESS: {
            return { ...initialState, logoutFailed:false, logoutRequest:false };
        }
        case LOGOUT_FAILED: {
            return { ...state, logoutFailed:true };
        }
        case USER_DATA_REQUEST: {
            return { ...state, authRequest:true };
        }
        case USER_DATA_SUCCESS: {
            return { ...state, authFailed:false, authRequest:false, userName:action.payload.name, userEmail:action.payload.email };
        }
        case USER_DATA_FAILED: {
            return { ...state, authFailed:true };
        }
        case UPDATE_USER_REQUEST: {
            return { ...state, authRequest:true };
        }
        case UPDATE_USER_SUCCESS: {
            return { ...state, authFailed:false, authRequest:false, userName:action.payload.name, userEmail:action.payload.email };
        }
        case UPDATE_USER_FAILED: {
            return { ...state, authFailed:true };
        }
        case AUTH_TOKEN_REQUEST: {
            return { ...state, tokenRequest:true };
        }
        case AUTH_TOKEN_SUCCESS: {
            return { ...state, tokenFailed:false, tokenRequest:false };
        }
        case AUTH_TOKEN_FAILED: {
            return { ...state, tokenFailed:true };
        }

        default: {
             return state;
        }
    }
}

