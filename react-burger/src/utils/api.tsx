import { isTemplateExpression } from "typescript";
import { getCookie } from './cookie';
import {ThunkDispatch} from "redux-thunk";
import {EmptyObject} from "redux";
import {IGetOrderError, IGetOrderRequest, IGetOrderReset, IGetOrderSuccess, Order} from "../services/actions/order";
import {IAuthState} from "../services/reducers/auth";
import {
    IAddBunConstructor,
    IAddIngredientConstructor,
    IConstructor,
    IMoveIngridientConstructor, IRemoveIngridientConstructor, IResetConstructor
} from "../services/actions/constructor";
import {
    IGetIngridientItem,
    IIngridientsError,
    IIngridientsRequest,
    IIngridientsSuccess, IResetIngridientItem
} from "../services/actions/ingridients";
import {TAuthActions} from "../services/actions/auth";
import {TWsActions} from "../services/actions/wsActions";
import {TWsUserActions} from "../services/actions/wsUserActions";


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

   checkResponse = async (url:string, settings:object) => {

           const result = await fetch(url, settings);
           const res = result.ok ? await result.json() : await Promise.reject(result);
           return res;
   }

   getResource = async (url : string, body?: object | string | undefined) => {
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

    return await this.checkResponse(url, settings)

   }

    getAuthPswdData = async (url : string, body: object | string, method:string) => {

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

        if(body){
            JSON.stringify(body)
        }
        return await this.checkResponse(url, settings)
    }

    getAuthData = async (url:string, body: object | null, method:string) => {

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

        if(body){
            JSON.stringify(body)
            console.log(JSON.stringify(body))
        }
        return await this.checkResponse(url, settings)
    }



    getAllData = () => {
     return this.getResource(`${this._baseURL}${this._apiURL}`)
   }

   getOrderData = (orderItem:object) => {
       return this.getResource(`${this._baseURL}${this._orderURL}`, {ingredients: orderItem})
   }


   remindPswd = (form:object) => {
        return this.getAuthPswdData(`${this._baseURL}${this._pswdForgot}`, {form}, "POST")
   }

   resetPswd = (form:{email:string}) => {
       return this.getAuthPswdData(`${this._baseURL}${this._pswdReset}`, {email: form.email}, "POST")
   }

   authUser = (form: {email:string, password: string}) => {
        return this.getAuthData(`${this._baseURL}${this._authLogin}`, {email: form.email,
            password: form.password}, "POST")
   }

    registerUser = (form: {email: string, password: string, name: string}) => {

        return this.getAuthData(`${this._baseURL}${this._registerUser}`, {
            email: form.email,
            password: form.password,
            name: form.name
        }, "POST")
    }

   getAuthUser = () => {
        return this.getAuthData(`${this._baseURL}${this._authUser}`, {},"GET")
   }

   updateAuthUser = (form:object) => {
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