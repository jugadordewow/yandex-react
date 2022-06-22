import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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

const [order, setOrderInfo] = useState(false);

const [modal, setModal] = useState('hidden');

    useEffect(() => {
      const onRequest = () => {
        burgerService.getAllData()
        .then (res => setData([...data, ...res]))
        .catch();
      };
      onRequest();
    }, [] );
   
    useEffect(() => {
      setModalInfo();
    }, [order, selectedItem])

const onItemSelected = (id) => {
  setSelectedItem(selectedItem => id);
}  

const setOrder = () => {
    setOrderInfo(order => true);
}

const setModalInfo = () => {
  if(selectedItem !== null || order !== false) {
      setModal('active');
  }
}

const itemInfo = (selectedItem !== null && selectedItem !== '') ? <IngridientDetails onItemSelected = {selectedItem}  /> :null;
const orderInfo = (order !== false && order !== null) ? <OrderDetails setOrder = {order} /> : null;

  return (
    
    <div className="App">
      <AppHeader/>
      <div className="main">
         {data.length > 0 ? <BurgerIngredients 
            onItemSelected = {onItemSelected}
            props = {data}/> : null }
          {data.length > 0 ? <BurgerConstructor 
                                  props = {data} 
                                  setOrder = {setOrder}
                              /> : null}
         <Modal modal ={modal} >
            {itemInfo}
            {orderInfo}
         </Modal>
      </div>
    </div>
  );
}

App.propTypes = {
  onItemSelected: PropTypes.func,
  setOrder: PropTypes.bool
}

export default App;


