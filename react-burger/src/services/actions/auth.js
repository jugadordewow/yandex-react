import {
    deleteCookie,
    setCookie
} from '../../utils/cookie';
import { createAction } from '@reduxjs/toolkit';

export const forgotPswdRequest = createAction("@@forgotPswd/REQUEST")
export const forgotPswdSuccess = createAction("@@forgotPswd/SUCCESS")
export const forgotPswdFailed =  createAction('@@forgotPswd/FAILED' )

export const resetPswdRequest = createAction("@@resetPswd/REQUEST")
export const resetPswdSuccess = createAction("@@resetPswd/SUCCESS")
export const resetPswdFailed = createAction('@@resetPswd/FAILED' )

export const registerUserRequest = createAction("@@registerUser/REQUEST")
export const registerUserSuccess = createAction("@@registerUser/SUCCESS")
export const registerUserFailed = createAction('@@registerUser/FAILED' )

export const loginUserRequest = createAction("@@loginUser/REQUEST")
export const loginUserSuccess = createAction("@@loginUser/SUCCESS")
export const loginUserFailed = createAction('@@loginUser/FAILED' )

export const logoutUserRequest = createAction("@@logoutUser/REQUEST")
export const logoutUserSuccess = createAction("@@logoutUser/SUCCESS")
export const logoutUserFailed = createAction('@@logoutUser/FAILED' )

export const userRequest = createAction("@@user/REQUEST")
export const userSuccess = createAction("@@user/SUCCESS")
export const userFailed =  createAction('@@user/FAILED' )

export const updateUserRequest = createAction("@@updateUser/REQUEST")
export const updateUserSuccess = createAction("@@updateUser/SUCCESS")
export const updateUserFailed =  createAction('@@updateUser/FAILED' )

export const authTokenRequest = createAction("@@authToken/REQUEST")
export const authTokenSuccess = createAction("@@authToken/SUCCESS")
export const authTokenFailed = createAction('@@authToken/FAILED' )

export const forgotPswd = (form, redirect) => (dispatch, _, burgerConstructor) => {
    dispatch(forgotPswdRequest())
    burgerConstructor.remindPswd(form,redirect)
        .then(res => {
            if(res && res.success){
                dispatch(forgotPswdSuccess())
                redirect()
            } else {
                dispatch(forgotPswdFailed())
            }
        })
        .catch(error => {dispatch(forgotPswdFailed(error))})
}

export const resetPaswd = (form, redirect) => (dispatch, _, burgerConstructor) => {
    dispatch(resetPswdRequest())
    burgerConstructor.resetPswd(form)
        .then(res => {
            if(res && res.success) {
                dispatch(resetPswdSuccess())
                redirect()
            }else {
                dispatch(resetPswdFailed())
            }
        })
        .catch((error) => dispatch(resetPswdFailed(error)))
}

export const userRegister = (form,redirect) => (dispatch, _, burgerConstructor) => {
    dispatch(registerUserRequest())
    burgerConstructor.registerUser(form)
        .then(res => {
            const accessToken = res.accessToken.split('Bearer ')[1];
            const refreshToken = res.refreshToken;
            setCookie('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            if (res && res.success) {
                dispatch(registerUserSuccess(res.user));
                redirect();
            } else {
                dispatch(registerUserFailed());
            }
        })
        .catch((error) => dispatch(registerUserFailed(error)))

}

export const login = (form) => (dispatch, _, burgerConstructor) => {
    dispatch(loginUserRequest())
    burgerConstructor.authUser(form)
        .then(res => {
            const accessToken = res.accessToken.split('Bearer ')[1];
            const refreshToken = res.refreshToken;
            setCookie('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
                if(res && res.success) {
                    dispatch(loginUserSuccess(res.user))
                } else {
                    dispatch(loginUserFailed())
                }
            }
        )
        .catch((error) => {
            dispatch(loginUserFailed(error))
        })
}

export const logout = (redirect) => (dispatch, _, burgerConstructor) => {
    dispatch(logoutUserRequest())
    burgerConstructor.logoutUser()
        .then(res => {
            localStorage.removeItem('refreshToken');
            deleteCookie('token');
            if (res && res.success) {
                dispatch(logoutUserSuccess());
                redirect();
            } else {
                dispatch(logoutUserFailed());
            }
        })
        .catch((error) => {
            dispatch(logoutUserFailed(error))
        })
}

export const updateAuth = (form) => (dispatch, _, burgerConstructor) => {
    dispatch(updateUserRequest())
    burgerConstructor.updateAuthUser(form)
        .then(res => {
            if (res && res.success) {
                dispatch(updateUserSuccess(res.user));
            } else {
                dispatch(updateUserFailed());
            }
        })
        .catch(e => {
            if ((e.message === 'jwt expired') || (e.message === 'Token is invalid')) {
                dispatch(getAccessToken());
                dispatch(updateAuth(form));
            } else dispatch(updateUserFailed())
        })
}

export const getAuth = () => (dispatch, _, burgerConstructor) => {
    dispatch(userRequest());
    burgerConstructor.getAuthUser()
        .then(res => {
            if (res && res.success) {
                dispatch(userSuccess(res.user));
                return res;
            } else {
                dispatch(userFailed());
            }
        })
        .catch(e => {
            if ((e.message === 'jwt expired') || (e.message === 'Token is invalid')) {
                dispatch(getAccessToken());
                dispatch(getAuth());
            } else dispatch(userFailed(e.message))
        });
}

export const getAccessToken = () => (dispatch, _, burgerConstructor) => {
        dispatch(authTokenRequest());
        burgerConstructor.accessToken()
            .then(res => {
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('token', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                if (res && res.success) {
                    dispatch(authTokenSuccess());
                } else {
                    logout();
                    dispatch(authTokenFailed());
                }
            })
            .catch(e => {
                if (e.message === 'Token is invalid') {
                    dispatch(getAccessToken());
                } else dispatch(authTokenFailed(e.message))
            });
};