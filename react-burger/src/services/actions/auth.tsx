import {
    deleteCookie,
    setCookie
} from '../../utils/cookie';
import { createAction} from '@reduxjs/toolkit';
import {AppThunk, AppDispatch} from "../types";
import {useHistory} from "react-router-dom";
import {
    accessToken,
    authUser,
    getAuthUser,
    logoutUser,
    registerUser,
    remindPswd,
    resetPswd,
    updateAuthUser
} from "../../utils/api";


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
    authTokenFailed: createAction<{e:{message: string}}>('@@authToken/FAILED'),
}


export type TAuthActions =  typeof authActions

export const forgotPswd:AppThunk = (form: { email: string }, redirect: () => void) => {
    return function(dispatch: AppDispatch) {
        dispatch(authActions.forgotPswdRequest())
        remindPswd(form)
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
}

export const resetPaswd: AppThunk = (form:{email:string,password:string},redirect:()=>void) => {
    return function(dispatch:AppDispatch) {
        dispatch(authActions.resetPswdRequest())
        resetPswd(form)
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
}


export const userRegister:AppThunk = (form:{email:string, password: string, name: string},redirect:() => void) => {
    return function (dispatch:AppDispatch) {
        dispatch(authActions.registerUserRequest())
        registerUser(form)
            .then((res: { accessToken: string; refreshToken: string; success: string; user: { name: string; email: string; }; }) => {
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('token', accessToken, { maxAge: 300000, secure: false, sameSite: "Lax" });
                localStorage.setItem('refreshToken', refreshToken);
                if (res && res.success) {
                    dispatch(authActions.registerUserSuccess(res.user));
                    redirect();
                } else {
                    dispatch(authActions.registerUserFailed);
                }
            })
            .catch((error: { error: object; }) => dispatch(authActions.registerUserFailed(error)))
    }
}

export const login: AppThunk = (form:{email:string, password:string}) => {
    return function (dispatch: AppDispatch) {
        dispatch(authActions.loginUserRequest())
        authUser(form)
            .then((res: { accessToken: string; refreshToken: string; success: string; user: { name: string; email: string; }; }) => {
                    const accessToken = res.accessToken.split('Bearer ')[1];
                    const refreshToken = res.refreshToken;
                    setCookie('token', accessToken, {maxAge: 300000, secure: false, sameSite: "Lax"});
                    localStorage.setItem('refreshToken', refreshToken);
                    if (res && res.success) {
                        dispatch(authActions.loginUserSuccess(res.user))
                    } else {
                        dispatch(authActions.loginUserFailed)
                    }
                }
            )
            .catch((error:any) => {
                dispatch(authActions.loginUserFailed(error))
            });
    }
}
export const logout: AppThunk = (redirect:()=>void) =>{
    return function (dispatch: AppDispatch){
        dispatch(authActions.logoutUserRequest)
        logoutUser()
            .then((res:any) => {
                localStorage.removeItem('refreshToken');
                deleteCookie('token');
                if (res && res.success) {
                    dispatch(authActions.logoutUserSuccess);
                    redirect();
                } else {
                    dispatch(authActions.logoutUserFailed);
                }
            })
            .catch((error: any) => {
                dispatch(authActions.logoutUserFailed(error))
            })
    }
}

export const updateAuth:AppThunk = (form:{name:string, email:string}) =>{
    return function (dispatch:AppDispatch) {
        dispatch(authActions.updateUserRequest())
        updateAuthUser(form)
            .then((res: { success: string; user: { name: string; email: string; }; }) => {
                if (res && res.success) {
                    dispatch(authActions.updateUserSuccess(res.user));
                } else {
                    dispatch(authActions.updateUserFailed());
                }
            })
            .catch((e: { message: string; }) => {
                if ((e.message === 'jwt expired') || (e.message === 'Token is invalid')) {
                    dispatch(getAccessToken());
                    dispatch(updateAuth(form));
                } else dispatch(authActions.updateUserFailed())
            })
    }
}

export const getAuth:AppThunk = () =>{
    return function(dispatch:AppDispatch){
        dispatch(authActions.userRequest());
        getAuthUser()
            .then((res: { success: string; user: { name: string; email: string; }; }) => {
                if (res && res.success) {
                    dispatch(authActions.userSuccess(res.user));
                    return res;
                } else {
                    dispatch(authActions.userFailed);
                }
            })
            .catch((e: { message: string; }) => {
                dispatch(logout(() => useHistory().push('/login')))
                dispatch(authActions.userFailed(e))
            });
    }

}
export const getAccessToken:AppThunk = () => {
    return function (dispatch:AppDispatch){
        dispatch(authActions.authTokenRequest());
        accessToken()
            .then((res: { accessToken: string; refreshToken: string; success: string; }) => {
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('token', accessToken, { maxAge: 300000, secure: false, sameSite: "Lax" });
                localStorage.setItem('refreshToken', refreshToken);
                if (res && res.success) {
                    dispatch(authActions.authTokenSuccess());
                } else {
                    dispatch(logout());
                    dispatch(authActions.authTokenFailed);
                }
            })
            .catch((e: { message: string; }) => {
                if (e.message === 'Token is invalid') {
                    getAccessToken();
                } else {
                    dispatch(authActions.authTokenFailed)
                }
            });
    };
}

