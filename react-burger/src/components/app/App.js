import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import AppHeader from '../app-header/app-header';
import BurgerService from "../../utils/data";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import ModalOverlay from '../modal-overlay/modal-overlay';
import OrderDetails from '../oder-details/order-details';
import IngridientDetails from '../ingridient-details/ingridient-details';
import { setConstantValue } from 'typescript';


const App = () => {

const burgerService = new BurgerService();

const [data, setData] = useState([]);

const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
      const onRequest = () => {
        burgerService.getAllData()
        .then (res => setData([...data, ...res]))
        .catch();
      };
      onRequest();
    }, [] );
   
    
const onItemSelected = (id) => {
  setSelectedItem(selectedItem => id);
}  

const content = (selectedItem != null) ? (<OrderDetails id = {onItemSelected}/>) : (null)  

  return (
    
    <div className="App">
      <AppHeader/>
      <div className="main">
         {data.length > 0 ? <BurgerIngredients 
            onItemSelected = {onItemSelected}
            props = {data}/> : null }
          {data.length > 0 ? <BurgerConstructor props = {data} /> : null}
         {/* <Modal >
            {content}
         </Modal> */}
      </div>
    </div>
  );
}

export default App;


