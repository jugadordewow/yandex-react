import {authReducer, initialState} from "./auth";
import {authActions} from "../actions/auth";

describe('authReducer', () => {
    it('should return the initial state', ()=>{
        expect(authReducer(undefined, {})).toEqual(
            initialState
        )
    })
    it('should handle forgotPswdRequest', ()=>{
        expect(authReducer(initialState, {
            type: authActions.forgotPswdRequest
        })).toEqual({
            ...initialState,
            forgotPswdRequest: true
        })
    })
    it('should handle forgotPswdSuccess', ()=>{
        expect(authReducer(initialState, {
            type: authActions.forgotPswdSuccess
        })).toEqual({
            ...initialState,
            forgotPswdRequest: false
        })
    })
    it('should handle forgotPswdFailed', ()=>{
        expect(authReducer(initialState, {
            type: authActions.forgotPswdFailed,
            payload:{error: {error: 'some error'}}
        })).toEqual({
            ...initialState,
            forgotPswdRequest: false,
            forgotPswdFailed: true,
            error: {error: 'some error'},
        })
    })
    it('should handle resetPswdRequest', ()=>{
        expect(authReducer(initialState, {
            type: authActions.resetPswdRequest
        })).toEqual({
            ...initialState,
            resetPswdRequest: true,
        })
    })
    it('should handle resetPswdFailed', ()=>{
        expect(authReducer(initialState, {
            type: authActions.resetPswdFailed,
            payload: {error: {error: 'some error'}},
        })).toEqual({
            ...initialState,
            resetPswdFailed: true,
            error: {error: 'some error'},
        })
    })
    it('should handle registerUserRequest', ()=>{
        expect(authReducer(initialState, {
            type: authActions.registerUserRequest
        })).toEqual({
            ...initialState,
            registerRequest: true
        })
    })
    it('should handle registerUserSuccess', ()=>{
        expect(authReducer(initialState, {
            type: authActions.registerUserSuccess,
            payload: {
                name:'Username',
                email: 'Email'
            }
        })).toEqual({
            ...initialState,
            registerRequest: false,
            name: 'Username',
            email: 'Email'
        })
    })
    it('should handle registerUserFailed', ()=>{
        expect(authReducer(initialState, {
            type: authActions.registerUserFailed,
            payload: {error: {error: 'some error'}}
        })).toEqual({
            ...initialState,
            registerFailed: true,
        })
    })
    it('should handle userRequest', ()=>{
        expect(authReducer(initialState, {
            type: authActions.userRequest
        })).toEqual({
            ...initialState,
            authRequest: true,
        })
    })
    it('should handle userSuccess', ()=>{
        expect(authReducer(initialState, {
            type: authActions.userSuccess,
            payload: {
                name:'Username',
                email: 'Email'
            }
        })).toEqual({
            ...initialState,
            authRequest: false,
            name: 'Username',
            email: 'Email'
        })
    })
    it('should handle userFailed', ()=>{
        expect(authReducer(initialState, {
            type: authActions.userFailed
        })).toEqual({
            ...initialState,
            authFailed: true,
        })
    })
    it('should handle updateUserRequest', ()=>{
        expect(authReducer(initialState, {
            type: authActions.updateUserRequest
        })).toEqual({
            ...initialState,
            authRequest: true,
        })
    })
    it('should handle updateUserSuccess', ()=>{
        expect(authReducer(initialState, {
            type: authActions.updateUserSuccess,
            payload: {
                name:'Username',
                email: 'Email'
            }
        })).toEqual({
            ...initialState,
            authRequest: false,
            name: 'Username',
            email: 'Email'
        })
    })
    it('should handle updateUserFailed', ()=>{
        expect(authReducer(initialState, {
            type: authActions.updateUserFailed
        })).toEqual({
            ...initialState,
            authFailed: true,
        })
    })
    it('should handle loginUserRequest', ()=>{
        expect(authReducer(initialState, {
            type: authActions.loginUserRequest
        })).toEqual({
            ...initialState,
            loginRequest: true,
        })
    })
    it('should handle loginUserSuccess', ()=>{
        expect(authReducer(initialState, {
            type: authActions.loginUserSuccess,
            payload: {
                name:'Username',
                email: 'Email'
            }
        })).toEqual({
            ...initialState,
            loginRequest: false,
            name: 'Username',
            email: 'Email'
        })
    })
    it('should handle loginUserFailed', ()=>{
        expect(authReducer(initialState, {
            type: authActions.loginUserFailed
        })).toEqual({
            ...initialState,
            loginFailed: true,
        })
    })
    it('should handle logoutUserRequest', ()=>{
        expect(authReducer(initialState, {
            type: authActions.logoutUserRequest
        })).toEqual({
            ...initialState,
            logoutRequest: true,
        })
    })
    it('should handle logoutUserSuccess', ()=>{
        expect(authReducer(initialState, {
            type: authActions.logoutUserSuccess,
        })).toEqual({
            ...initialState,
            logoutRequest: false,
            logoutFailed: false,
            name: '',
            email: ''
        })
    })
    it('should handle logoutUserFailed', ()=>{
        expect(authReducer(initialState, {
            type: authActions.logoutUserFailed
        })).toEqual({
            ...initialState,
            logoutFailed: true,
        })
    })
    it('should handle authTokenRequest', ()=>{
        expect(authReducer(initialState, {
            type: authActions.authTokenRequest
        })).toEqual({
            ...initialState,
            tokenRequest: true,
        })
    })
    it('should handle authTokenSuccess', ()=>{
        expect(authReducer(initialState, {
            type: authActions.authTokenSuccess
        })).toEqual({
            ...initialState,
            tokenRequest: false,
            tokenFailed: false,
        })
    })
    it('should handle authTokenFailed', ()=>{
        expect(authReducer(initialState, {
            type: authActions.authTokenFailed
        })).toEqual({
            ...initialState,
            tokenFailed: true,
        })
    })
})