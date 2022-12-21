import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
    authActions
} from '../actions/auth';

export interface IAuthState {
    name: string,
    email: string,
    error: object,
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
    error: {},

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
        .addCase(authActions.forgotPswdFailed, (state, action) => {
            state.forgotPswdRequest = false;
            state.forgotPswdFailed = true;
            state.error = action.payload.error;
        })
        .addCase(authActions.resetPswdRequest, state => {
            state.resetPswdRequest = true;
        })
        .addCase(authActions.resetPswdSuccess, state => {
            state.resetPswdRequest = false;
        })
        .addCase(authActions.resetPswdFailed, (state, action) => {
            state.resetPswdFailed = true;
            state.error = action.payload.error;
        })
        .addCase(authActions.registerUserRequest, state => {
            state.registerRequest = true;
        })
        .addCase(authActions.registerUserSuccess, (state, action) => {
            state.registerRequest = false;
            state.name = action.payload.name;
            state.email = action.payload.email;
        })
        .addCase(authActions.registerUserFailed, state => {
            state.registerFailed = true;
        })
        .addCase(authActions.userRequest, state => {
            state.authRequest = true;
        })
        .addCase(authActions.userSuccess, (state, action) => {
            state.authRequest = false;
            state.name = action.payload.name;
            state.email = action.payload.email;
        })
        .addCase(authActions.userFailed, state => {
            state.authFailed = true;
        })
        .addCase(authActions.updateUserRequest, state => {
            state.authRequest = true;
        })
        .addCase(authActions.updateUserSuccess, (state, action) => {
            state.authRequest = false;
            state.name = action.payload.name;
            state.email = action.payload.email;
        })
        .addCase(authActions.updateUserFailed, state => {
            state.authFailed = true;
        })
        .addCase(authActions.loginUserRequest, state => {
            state.loginRequest = true;
        })
        .addCase(authActions.loginUserSuccess, (state, action) => {
            state.loginRequest = false;
            state.name = action.payload.name;
            state.email = action.payload.email;
        })
        .addCase(authActions.loginUserFailed, state => {
            state.loginFailed = true;
        })
        .addCase(authActions.logoutUserRequest, state => {
            state.logoutRequest = true;
        })
        .addCase(authActions.logoutUserSuccess, state => {
            state.logoutRequest = false;
            state.logoutFailed = false;
            state.name = '';
            state.email = '';
        })
        .addCase(authActions.logoutUserFailed, state => {
            state.logoutFailed = true;
        })
        .addCase(authActions.authTokenRequest, state => {
            state.tokenRequest = true;
        })
        .addCase(authActions.authTokenSuccess, state => {
            state.tokenRequest = false;
            state.tokenFailed = false;
        })
        .addCase(authActions.authTokenFailed, state => {
            state.tokenFailed = true;
        })
})
