import {
    deleteCookie,
    setCookie
} from '../../utils/cookie';
import { createAction} from '@reduxjs/toolkit';
import {AppThunk, AppDispatch} from "../types";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;


export const authActions = {
    forgotPswdRequest: createAction("@@forgotPswd/REQUEST"),
    forgotPswdSuccess: createAction("@@forgotPswd/SUCCESS"),
    forgotPswdFailed: createAction<{error: object}>('@@forgotPswd/FAILED'),
    resetPswdRequest: createAction("@@resetPswd/REQUEST"),
    resetPswdSuccess: createAction("@@resetPswd/SUCCESS"),
    resetPswdFailed: createAction<{error: object}>('@@resetPswd/FAILED'),
    registerUserRequest: createAction("@@registerUser/REQUEST"),
    registerUserSuccess: createAction<{ name: string, email: string }>("@@registerUser/SUCCESS"),
    registerUserFailed: createAction<{error: object}>('@@registerUser/FAILED'),
    loginUserRequest: createAction("@@loginUser/REQUEST"),
    loginUserSuccess: createAction<{ name: string, email: string }>("@@loginUser/SUCCESS"),
    loginUserFailed: createAction<{error: object}>('@@loginUser/FAILED'),
    logoutUserRequest: createAction("@@logoutUser/REQUEST"),
    logoutUserSuccess: createAction("@@logoutUser/SUCCESS"),
    logoutUserFailed: createAction<{error: object}>('@@logoutUser/FAILED'),
    userRequest: createAction("@@user/REQUEST"),
    userSuccess: createAction<{ name: string, email: string }>("@@user/SUCCESS"),
    userFailed: createAction<{message: string}>('@@user/FAILED'),
    updateUserRequest: createAction("@@updateUser/REQUEST"),
    updateUserSuccess: createAction<{ name: string, email: string }>("@@updateUser/SUCCESS"),
    updateUserFailed: createAction('@@updateUser/FAILED'),
    authTokenRequest: createAction("@@authToken/REQUEST"),
    authTokenSuccess: createAction("@@authToken/SUCCESS"),
    authTokenFailed: createAction<{message: string}>('@@authToken/FAILED'),
}

class ActionType<T> {
}

export type TAuthActions =  ActionType<typeof authActions>

export const forgotPswd: AppThunk = (form, redirect) => (dispatch: AppDispatch, _: any, burgerConstructor:any) => {
    dispatch(authActions.forgotPswdRequest())
    burgerConstructor.remindPswd(form,redirect)
        .then((res: { success: string; }) => {
            if(res && res.success){
                dispatch(authActions.forgotPswdSuccess())
                redirect()
            } else {
                dispatch(authActions.forgotPswdFailed)
            }
        })
        .catch((error: { error: object; }) => {dispatch(authActions.forgotPswdFailed(error))})
}

export const resetPaswd: AppThunk = (form, redirect) => (dispatch:AppDispatch, _ : any, burgerConstructor:any) => {
    dispatch(authActions.resetPswdRequest())
    burgerConstructor.resetPswd(form)
        .then((res: { success: string; }) => {
            if(res && res.success) {
                dispatch(authActions.resetPswdSuccess())
                redirect()
            }else {
                dispatch(authActions.resetPswdFailed)
            }
        })
        .catch((error: { error: object; }) => dispatch(authActions.resetPswdFailed(error)))
}

export const userRegister:AppThunk = (form,redirect) => (dispatch:AppDispatch, _:any, burgerConstructor:any) => {
    dispatch(authActions.registerUserRequest())
    burgerConstructor.registerUser(form)
        .then((res: { accessToken: string; refreshToken: any; success: any; user: { name: string; email: string; }; }) => {
            const accessToken = res.accessToken.split('Bearer ')[1];
            const refreshToken = res.refreshToken;
            setCookie('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            if (res && res.success) {
                dispatch(authActions.registerUserSuccess(res.user));
                redirect();
            } else {
                dispatch(authActions.registerUserFailed);
            }
        })
        .catch((error: any) => dispatch(authActions.registerUserFailed(error)))

}

export const login: AppThunk = (form) => (dispatch:AppDispatch, _: any, burgerConstructor: any) => {
    dispatch(authActions.loginUserRequest())
    burgerConstructor.authUser(form)
        .then((res: { accessToken: string; refreshToken: any; success: string; user: { name: string; email: string; }; }) => {
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('token', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                if (res && res.success) {
                    dispatch(authActions.loginUserSuccess(res.user))
                } else {
                    dispatch(authActions.loginUserFailed)
                }
            }
        )
        .catch((error: any) => {
            dispatch(authActions.loginUserFailed(error))
        });
}

export const logout: AppThunk = (redirect) => (dispatch: AppDispatch, _:any, burgerConstructor:any) => {
    dispatch(authActions.logoutUserRequest)
    burgerConstructor.logoutUser()
        .then((res: { success: any; }) => {
            localStorage.removeItem('refreshToken');
            deleteCookie('token');
            if (res && res.success) {
                dispatch(authActions.logoutUserSuccess());
                // @ts-ignore
                redirect();
            } else {
                dispatch(authActions.logoutUserFailed);
            }
        })
        .catch((error: any) => {
            dispatch(authActions.logoutUserFailed(error))
        })
}

export const updateAuth:AppThunk = (form) => (dispatch:AppDispatch, _:any, burgerConstructor:any) => {
    dispatch(authActions.updateUserRequest())
    burgerConstructor.updateAuthUser(form)
        .then((res: { success: any; user: { name: string; email: string; }; }) => {
            if (res && res.success) {
                dispatch(authActions.updateUserSuccess(res.user));
            } else {
                dispatch(authActions.updateUserFailed());
            }
        })
        .catch((e: { message: string; }) => {
            if ((e.message === 'jwt expired') || (e.message === 'Token is invalid')) {
                // @ts-ignore
                dispatch(getAccessToken());
                // @ts-ignore
                dispatch(updateAuth(form));
            } else dispatch(authActions.updateUserFailed())
        })
}

export const getAuth:AppThunk = () => (dispatch:AppDispatch, _:any, burgerConstructor:any) => {
    dispatch(authActions.userRequest());
    burgerConstructor.getAuthUser()
        .then((res: { success: any; user: { name: string; email: string; }; }) => {
            if (res && res.success) {
                dispatch(authActions.userSuccess(res.user));
                return res;
            } else {
                dispatch(authActions.userFailed);
            }
        })
        .catch((e: { message: string; }) => {
            if ((e.message === 'jwt expired') || (e.message === 'Token is invalid')) {
                dispatch(getAccessToken);
                dispatch(getAuth);
            } else { // @ts-ignore
                dispatch(authActions.userFailed(e.message))
            }
        });
}

export const getAccessToken:AppThunk = () => (dispatch:AppDispatch, _: any, burgerConstructor: { accessToken: () => Promise<any>; }) => {
        dispatch(authActions.authTokenRequest());
        burgerConstructor.accessToken()
            .then(res => {
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('token', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                if (res && res.success) {
                    dispatch(authActions.authTokenSuccess());
                } else {
                    dispatch(logout);
                    dispatch(authActions.authTokenFailed);
                }
            })
            .catch((e: { message: string; }) => {
                if (e.message === 'Token is invalid') {
                    dispatch(getAccessToken);
                } else { // @ts-ignore
                    dispatch(authActions.authTokenFailed(e.message))
                }
            });
};