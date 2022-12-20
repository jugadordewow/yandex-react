import { isTemplateExpression } from "typescript";
import { getCookie } from './cookie';

    const _baseURL = 'https://norma.nomoreparties.space/api';

    const _apiURL = '/ingredients/';

    const _orderURL = '/orders';

    const _pswdForgot = '/password-reset';

    const _pswdReset = '/password-reset/reset';

    const _authUser = '/auth/user';

    const _authLogout = '/auth/logout';

    const _authLogin = '/auth/login';

    const _authToken = '/auth/token';

    const _registerUser = '/auth/register';

    export const checkResponse = async (url:string, settings:object) => {

        const result = await fetch(url, settings);
        const res = result.ok ? await result.json() : await Promise.reject(result);
        return res;
    }

    export const getResource = async (url : string, body?: object | string | undefined) => {
        const settings = {
            method: body ? 'POST':'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        };

        // if(body){
        //     JSON.stringify(body)
        // }

        return await checkResponse(url, settings)

    }

    export const getAuthPswdData = async (url : string, body: object | string, method:string) => {

        const settings = {
            method:method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            cache: 'no-cache',
            mode: 'cors',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body:  JSON.stringify(body)
        }

        // if(body){
        //     JSON.stringify(body)
        // }
        return await checkResponse(url, settings)
    }

    export const getAuthData = async (url:string, body: object | null, method:string) => {

        const settings = {
            method:method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getCookie('token')}`
            },
            cache: 'no-cache',
            mode: 'cors',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(body)
        }

        // if(body){
        //     JSON.stringify(body)
        //     console.log(JSON.stringify(body))
        // }
        return await checkResponse(url, settings)
    }

    export const getOrderNum = async (url:string, body: object | null, method:string) => {

        const settings = {
            method:method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getCookie('token')}`
            },
            body: JSON.stringify(body)
        }
        return await checkResponse(url, settings)
    }



    export const getAllData = () => {
        return getResource(`${_baseURL}${_apiURL}`)
    }

    export const getOrderData = (orderItem: string[]) => {
        console.log(orderItem)
        return getOrderNum(`${_baseURL}${_orderURL}`, {ingredients: orderItem}, "POST")
    }


    export const remindPswd = (form:object) => {
        return getAuthPswdData(`${_baseURL}${_pswdForgot}`, {form}, "POST")
    }

    export const resetPswd = (form:{email:string}) => {
        return getAuthPswdData(`${_baseURL}${_pswdReset}`, {email: form.email}, "POST")
    }

    export const authUser = (form: {email:string, password: string}) => {
        return getAuthData(`${_baseURL}${_authLogin}`, {email: form.email,
            password: form.password}, "POST")
    }

    export const registerUser = (form: {email: string, password: string, name: string}) => {

        return getAuthData(`${_baseURL}${_registerUser}`, {
            email: form.email,
            password: form.password,
            name: form.name
        }, "POST")
    }

    export const getAuthUser = () => {
        return getAuthData(`${_baseURL}${_authUser}`, {},"GET")
    }

    export const updateAuthUser = (form:object) => {
        return getAuthData(`${_baseURL}${_authUser}`, {form},"PATCH")
    }

    export const logoutUser = () => {
        return getAuthPswdData(`${_baseURL}${_authLogout}`, { token: localStorage.refreshToken}, "POST")
    }

    export const accessToken = () => {
        return getAuthPswdData(`${_baseURL}${_authToken}`, { token: localStorage.refreshToken}, "POST")
    }


