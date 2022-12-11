import {
    deleteCookie,
    setCookie
} from '../../utils/cookie';
import { createAction, EmptyObject, ThunkDispatch} from '@reduxjs/toolkit';
import {useAppDispatch} from "../hook";
import {AppThunk, AppDispatch, TAppActions} from "../types";
import {GET_INGRIDIENTS_SUCCESS, IIngridients} from "./ingridients";
import {IAuthState} from '../reducers/auth';

export const authActions = {
    forgotPswdRequest: createAction("@@forgotPswd/REQUEST"),
    forgotPswdSuccess: createAction("@@forgotPswd/SUCCESS"),
    forgotPswdFailed: (payload: {error: object}) => createAction('@@forgotPswd/FAILED'),
    resetPswdRequest: createAction("@@resetPswd/REQUEST"),
    resetPswdSuccess: createAction("@@resetPswd/SUCCESS"),
    resetPswdFailed: (error: object) => createAction('@@resetPswd/FAILED'),
    updateUserSuccess: createAction<{ name: string, email: string }>("@@updateUser/SUCCESS")
}
export type TAuthActions = ActionsUnion<typeof authActions>

//export const forgotPswdRequest = createAction("FORGOT_PSWD_REQUEST")
//export const forgotPswdSuccess = createAction("@@forgotPswd/SUCCESS")
//export const forgotPswdFailed = createAction('@@forgotPswd/FAILED')

//export const resetPswdRequest = createAction("@@resetPswd/REQUEST")
//export const resetPswdSuccess = createAction("@@resetPswd/SUCCESS")
//export const resetPswdFailed = createAction('@@resetPswd/FAILED')

export const registerUserRequest = createAction("@@registerUser/REQUEST")
export const registerUserSuccess = createAction<{ name: string, email: string }, '@@registerUser/SUCCESS'>("@@registerUser/SUCCESS")
export const registerUserFailed = createAction('@@registerUser/FAILED')

export const loginUserRequest = createAction("@@loginUser/REQUEST")
export const loginUserSuccess = createAction<{ name: string, email: string }>("@@loginUser/SUCCESS")
export const loginUserFailed = createAction('@@loginUser/FAILED')

export const logoutUserRequest = createAction("@@logoutUser/REQUEST")
export const logoutUserSuccess = createAction("@@logoutUser/SUCCESS")
export const logoutUserFailed = createAction('@@logoutUser/FAILED')

export const userRequest = createAction("@@user/REQUEST")
export const userSuccess = createAction<{ name: string, email: string }>("@@user/SUCCESS")
export const userFailed = createAction('@@user/FAILED')

export const updateUserRequest = createAction("@@updateUser/REQUEST")
//export const updateUserSuccess = createAction<{ name: string, email: string }>("@@updateUser/SUCCESS")
export const updateUserFailed = createAction('@@updateUser/FAILED')

export const authTokenRequest = createAction("@@authToken/REQUEST")
export const authTokenSuccess = createAction("@@authToken/SUCCESS")
export const authTokenFailed = createAction('@@authToken/FAILED')


export const forgotPswd: AppThunk = (form, redirect) => (dispatch: AppDispatch, _: any, burgerConstructor:any) => {
    dispatch(authActions.forgotPswdRequest())
    burgerConstructor.remindPswd(form,redirect)
        .then(res => {
            if(res && res.success){
                dispatch(authActions.forgotPswdSuccess())
                redirect()
            } else {
                dispatch(authActions.forgotPswdFailed)
            }
        })
        .catch(error => {dispatch(authActions.forgotPswdFailed(error))})
}

export const resetPaswd: AppThunk = (form, redirect) => (dispatch:AppDispatch, _, burgerConstructor) => {
    dispatch(authActions.resetPswdRequest())
    burgerConstructor.resetPswd(form)
        .then(res => {
            if(res && res.success) {
                dispatch(authActions.resetPswdSuccess())
                redirect()
            }else {
                dispatch(authActions.resetPswdFailed())
            }
        })
        .catch((error) => dispatch(authActions.resetPswdFailed(error)))
}

export const userRegister:AppThunk = (form,redirect) => (dispatch:AppDispatch, _, burgerConstructor) => {
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
                dispatch(authActions.updateUserSuccess(res.user));
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