import {
    deleteCookie,
    setCookie
} from '../../utils/cookie';

export const FORGOT_PSWD_REQUEST = "FORGOT_PSWD_REQUEST"
export const FORGOT_PSWD_SUCCESS = "FORGOT_PSWD_SUCCESS"
export const FORGOT_PSWD_FAILED = "FORGOT_PSWD_FAILED"

export const RESET_PSWD_REQUEST = "RESET_PSWD_REQUEST"
export const RESET_PSWD_SUCCESS = "RESET_PSWD_SUCCESS"
export const RESET_PSWD_FAILED = "RESET_PSWD_FAILED"

export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST"
export const REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS"
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED"

export const LOGIN_REQUEST = "LOGIN_REQUEST"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILED = "LOGIN_FAILED"

export const LOGOUT_REQUEST = "LOGOUT_REQUEST"
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const LOGOUT_FAILED = "LOGOUT_FAILED"

export const USER_DATA_REQUEST = "USER_DATA_REQUEST"
export const USER_DATA_SUCCESS = "USER_DATA_SUCCESS"
export const USER_DATA_FAILED = "USER_DATA_FAILED"

export const AUTH_TOKEN_REQUEST = "AUTH_TOKEN_REQUEST"
export const AUTH_TOKEN_SUCCESS = "AUTH_TOKEN_SUCCESS"
export const AUTH_TOKEN_FAILED = "AUTH_TOKEN_FAILED"

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST"
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS"
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED"



export const forgotPswd = (form, redirect) => (dispatch, _, burgerConstructor) => {
    dispatch({type: FORGOT_PSWD_REQUEST})
    burgerConstructor.remindPswd(form,redirect)
        .then(res => {
            if(res && res.success){
                dispatch({type: FORGOT_PSWD_SUCCESS})
                redirect()
            } else {
                dispatch({type: FORGOT_PSWD_FAILED})
            }
        })
        .catch(() => dispatch({type: FORGOT_PSWD_FAILED}))
}

export const resetPaswd = (form, redirect) => (dispatch, _, burgerConstructor) => {
    dispatch({type:RESET_PSWD_REQUEST})
    burgerConstructor.resetPswd(form)
        .then(res => {
            if(res && res.success) {
                dispatch({type: RESET_PSWD_SUCCESS})
                redirect()
            }else {
                dispatch({type: RESET_PSWD_FAILED})
            }
        })
        .catch(() => dispatch({type: RESET_PSWD_FAILED}))
}

export const userRegister = (form,redirect) => (dispatch, _, burgerConstructor) => {
    dispatch({type:REGISTER_USER_REQUEST})
    burgerConstructor.registerUser(form)
        .then(res => {
            const accessToken = res.accessToken.split('Bearer ')[1];
            const refreshToken = res.refreshToken;
            setCookie('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            if (res && res.success) {
                dispatch({
                    type: REGISTER_USER_SUCCESS,
                    payload:res.user
                });
                redirect();
            } else {
                dispatch({
                    type: REGISTER_USER_FAILED
                });
            }
        })

}

export const login = (form) => (dispatch, _, burgerConstructor) => {
    dispatch({type:LOGIN_REQUEST})
    burgerConstructor.authUser(form)
        .then(res => {
            const accessToken = res.accessToken.split('Bearer ')[1];
            const refreshToken = res.refreshToken;
            setCookie('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
                if(res && res.success) {
                    dispatch({type: LOGIN_SUCCESS, payload: res.user})
                } else {
                    dispatch({type: LOGIN_FAILED})
                }
            }
        )
        .catch(() => {
            dispatch({type: LOGIN_FAILED})
        })
}

export const logout = (redirect) => (dispatch, _, burgerConstructor) => {
    dispatch({type: LOGOUT_REQUEST})
    burgerConstructor.logoutUser()
        .then(res => {
            localStorage.removeItem('refreshToken');
            deleteCookie('token');
            if (res && res.success) {
                dispatch({
                    type: LOGOUT_SUCCESS,
                });
                redirect();
            } else {
                dispatch({
                    type: LOGOUT_FAILED
                });
            }
        })
        .catch(() => {
            dispatch({ type: LOGOUT_FAILED})
        })
}

export const updateAuth = (form) => (dispatch, _, burgerConstructor) => {
    dispatch({type: UPDATE_USER_REQUEST})
    burgerConstructor.updateAuthUser(form)
        .then(res => {
            if (res && res.success) {
                dispatch({
                    type: USER_DATA_SUCCESS,
                    payload: res.user
                });
            } else {
                dispatch({
                    type: USER_DATA_FAILED
                });
            }
        })
        .catch(e => {
            if ((e.message === 'jwt expired') || (e.message === 'Token is invalid')) {
                dispatch(getAccessToken());
                dispatch(updateAuth(form));
            } else dispatch({
                type: USER_DATA_FAILED,
            })
        })
}

export const getAuth = () => (dispatch, _, burgerConstructor) => {
    dispatch({
        type: USER_DATA_REQUEST
    });
    burgerConstructor.getAuthUser()
        .then(res => {
            if (res && res.success) {
                dispatch({
                    type: USER_DATA_SUCCESS,
                    user: res.user
                });
                return res;
            } else {
                dispatch({
                    type: USER_DATA_FAILED,
                });
            }
        })
        .catch(e => {
            if ((e.message === 'jwt expired') || (e.message === 'Token is invalid')) {
                dispatch(getAccessToken());
                dispatch(getAuth());
            } else dispatch({
                type: USER_DATA_FAILED,
            })
        });
}

export const getAccessToken = () => (dispatch, _, burgerConstructor) => {
        dispatch({ type: AUTH_TOKEN_REQUEST });
        burgerConstructor.accessToken()
            .then(res => {
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('token', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                if (res && res.success) {
                    dispatch({
                        type: AUTH_TOKEN_SUCCESS
                    });
                } else {
                    logout();
                    dispatch({
                        type: AUTH_TOKEN_FAILED
                    });
                }
            })
            .catch(e => {
                if (e.message === 'Token is invalid') {
                    dispatch(getAccessToken());
                } else dispatch({
                    type: AUTH_TOKEN_FAILED
                })
            });
};