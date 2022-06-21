import { isTemplateExpression } from "typescript";

class BurgerService {
   _apiURL = 'https://norma.nomoreparties.space/api/ingredients';

   getResource = async (url) => {

      const settings = {
         method: 'GET',
         headers: {
             Accept: 'application/json',
             'Content-Type': 'application/json',
         }
     };

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

   getBuns = () => {
      return this.getResource(`${this._apiURL}`)
      .then(res => res.data.filter(item => item.type.match('bun')))
   }

   getMain = () => {
      return this.getResource(`${this._apiURL}`)
      .then(res => res.data.filter(item => item.type.match('main')))
   }

   getIngridient = (id) => {
      return this.getResource(`${this._apiURL}`)
      .then(res => res.data.filter(item => item._id === id))
   }

}

 export default BurgerService;