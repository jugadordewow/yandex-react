import { isTemplateExpression } from "typescript";
import { getCookie } from './cookie';

class BurgerService {

    _baseURL = 'https://norma.nomoreparties.space/api';

   _apiURL = '/ingredients/';

   _orderURL = '/orders';

   _pswdForgot = '/password-reset';

   _pswdReset = '/password-reset/reset';

   _authUser = '/auth/user';

   _authLogout = '/auth/logout';

   _authLogin = '/auth/login';

   _authToken = '/auth/token';

   _registerUser = '/auth/register';

   checkResponse = async (url, settings) => {
       try {
           const result = await fetch(url, settings);
           const res = result.ok ? await result.json() : await Promise.reject(result);
           return res;
       }catch(e){
           return e;
       }
   }

   getResource = async (url, body) => {
      const settings = {
         method: body ? 'POST':'GET',
         headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
         }
     };

     if(body){
         settings.body = JSON.stringify(body)
     }

    return await this.checkResponse(url, settings)

   }

    getAuthPswdData = async (url, body, method) => {

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
           referrerPolicy: 'no-referrer'
       }

        if(body){
            settings.body = JSON.stringify(body)
        }
        return await this.checkResponse(url, settings)
    }

    getAuthData = async (url, body, method) => {

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
            referrerPolicy: 'no-referrer'
        }

        if(body){
            settings.body = JSON.stringify(body)
        }
        return await this.checkResponse(url, settings)
    }



    getAllData = () => {
     return this.getResource(`${this._baseURL}${this._apiURL}`)
   }

   getOrderData = (orderItem) => {
       return this.getResource(`${this._baseURL}${this._orderURL}`, {ingredients: orderItem})
   }

   getUserAuthRequest = (form) => {

   }

   remindPswd = (form) => {
        return this.getAuthPswdData(`${this._baseURL}${this._pswdForgot}`, {form}, "POST")
   }

   resetPswd = (form) => {
       return this.getAuthPswdData(`${this._baseURL}${this._pswdReset}`, {form}, "POST")
   }

   authUser = (form) => {
        return this.getAuthData(`${this._baseURL}${this._authLogin}`, {form}, "POST")
   }

    registerUser = (form) => {
        return this.getAuthData(`${this._baseURL}${this._registerUser}`, {form}, "POST")
    }

   getAuthUser = (form) => {
        return this.getAuthData(`${this._baseURL}${this._authUser}`, {},"GET")
   }

   updateAuthUser = (form) => {
       return this.getAuthData(`${this._baseURL}${this._authUser}`, {form},"PATCH")
   }

   logoutUser = () => {
       return this.getAuthPswdData(`${this._baseURL}${this._authLogout}`, { token: localStorage.refreshToken}, "POST")
   }

   accessToken = () => {
       return this.getAuthPswdData(`${this._baseURL}${this._authToken}`, { token: localStorage.refreshToken}, "POST")
   }

}

 export default BurgerService;