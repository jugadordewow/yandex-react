import { isTemplateExpression } from "typescript";

class BurgerService {
   _apiURL = 'https://norma.nomoreparties.space/api/ingredients';

   _orderURL = 'https://norma.nomoreparties.space/api/orders'

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
         const res = await result.json();
         return res;
     }catch(e){
         return e;
     }
   }

   getAllData = () => {
     return this.getResource(`${this._apiURL}`)
                .then(res => res.data)
   }

   getOrderData = (orderItem) => {
       return this.getResource(`${this._orderURL}`, {ingredients: orderItem})

   }

}

 export default BurgerService;