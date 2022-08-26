import { isTemplateExpression } from "typescript";

class BurgerService {

    _baseURL = 'https://norma.nomoreparties.space/api'

   _apiURL = '/ingredients/';

   _orderURL = '/orders'

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



     try {
         const result = await fetch(url, settings);
         const res = result.ok ? await result.json() : await Promise.reject(result);
         return res;
     }catch(e){
         return e;
     }
   }

   getAllData = () => {
     return this.getResource(`${this._baseURL}${this._apiURL}`)
   }

   getOrderData = (orderItem) => {
       return this.getResource(`${this._baseURL}${this._orderURL}`, {ingredients: orderItem})
   }

}

 export default BurgerService;