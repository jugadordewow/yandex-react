import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
    authActions,
    authTokenRequest,
    authTokenFailed,
    authTokenSuccess,
    //forgotPswdRequest,
    //forgotPswdFailed,
    //forgotPswdSuccess,
    //resetPswdFailed,
    //resetPswdRequest,
    //resetPswdSuccess,
    registerUserRequest,
    registerUserSuccess,
    registerUserFailed,
    userSuccess,
    userRequest,
    userFailed,
    updateUserFailed,
    updateUserSuccess,
    updateUserRequest,
    logoutUserRequest,
    logoutUserSuccess,
    logoutUserFailed,
    loginUserRequest,
    loginUserFailed,
    loginUserSuccess,
} from '../actions/auth';

export interface IAuthState {
    name: string,
    email: string,
    loginRequest: boolean,
    loginFailed: boolean,
    logoutRequest: boolean,
    logoutFailed: boolean,
    forgotPswdRequest: boolean,
    forgotPswdFailed: boolean,
    resetPswdRequest: boolean,
    resetPswdFailed: boolean,
    authRequest: boolean,
    authFailed: boolean,
    tokenRequest: boolean,
    tokenFailed: boolean,
    registerRequest: boolean,
    registerFailed:boolean
}

const initialState : IAuthState = {
    name:'',
    email:'',

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

    registerRequest: false,
    registerFailed:false
};

export const authReducer = createReducer(initialState,  builder => {
    builder
        .addCase(authActions.forgotPswdRequest, state =>{
            state.forgotPswdRequest = true;
        })
        .addCase(authActions.forgotPswdSuccess, state => {
            state.forgotPswdRequest = false;
        })
        .addCase(authActions.forgotPswdFailed, state => {
            state.forgotPswdRequest = false;
            state.forgotPswdFailed = true;
        })
        .addCase(authActions.resetPswdRequest, state => {
            state.resetPswdRequest = true;
        })
        .addCase(authActions.resetPswdSuccess, state => {
            state.resetPswdRequest = false;
        })
        .addCase(authActions.resetPswdFailed, state => {
            state.resetPswdFailed = true;
        })
        .addCase(registerUserRequest, state => {
            state.registerRequest = true;
        })
        .addCase(registerUserSuccess, (state, action) => {
            state.registerRequest = false;
            state.name = action.payload.name;
            state.email = action.payload.email;
        })
        .addCase(registerUserFailed, state => {
            state.registerFailed = true;
        })
        .addCase(userRequest, state => {
            state.authRequest = true;
        })
        .addCase(userSuccess, (state, action) => {
            state.authRequest = false;
            state.name = action.payload.name;
            state.email = action.payload.email;
        })
        .addCase(userFailed, state => {
            state.authFailed = true;
        })
        .addCase(updateUserRequest, state => {
            state.authRequest = true;
        })
        .addCase(authActions.updateUserSuccess, (state, action) => {
            state.authRequest = false;
            state.name = action.payload.name;
            state.email = action.payload.email;
        })
        .addCase(updateUserFailed, state => {
            state.authFailed = true;
        })
        .addCase(loginUserRequest, state => {
            state.loginRequest = true;
        })
        .addCase(loginUserSuccess, (state, action) => {
            state.loginRequest = false;
            state.name = action.payload.name;
            state.email = action.payload.email;
        })
        .addCase(loginUserFailed, state => {
            state.loginFailed = true;
        })
        .addCase(logoutUserRequest, state => {
            state.logoutRequest = true;
        })
        .addCase(logoutUserSuccess, state => {
            state.logoutRequest = false;
            state.logoutFailed = false;
            state.name = '';
            state.email = '';
        })
        .addCase(logoutUserFailed, state => {
            state.logoutFailed = true;
        })
        .addCase(authTokenRequest, state => {
            state.tokenRequest = true;
        })
        .addCase(authTokenSuccess, state => {
            state.tokenRequest = false;
            state.tokenFailed = false;
        })
        .addCase(authTokenFailed, state => {
            state.tokenFailed = true;
        })
})
