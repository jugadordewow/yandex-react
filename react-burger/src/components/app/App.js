import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerService from "../../utils/data";
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../oder-details/order-details';
import IngridientDetails from '../ingridient-details/ingridient-details';


const App = () => {

const burgerService = new BurgerService();

const [data, setData] = useState([]);

const [selectedItem, setSelectedItem] = useState(null);

const [orderVisible, setOrderVisible] = useState(false);

const [productInfo, setProductInfo] = useState(false);

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

const itemSelected = data.find(item => item._id === selectedItem);

const showOrderInfo = () => {
  setOrderVisible(true)
}

const hideOrderInfo = () => {
  setOrderVisible(false)
}

const showProductInfo = () => {
  setProductInfo(true)
}

const hideProductInfo = () => {
  setProductInfo(false)
}

  return (
    <div className={styles.App}>
      <AppHeader/>
      <div className={styles.main}>
         {data.length > 0 ? <BurgerIngredients 
            onItemSelected = {onItemSelected}
            onShowProduct = {showProductInfo}
            props = {data}/> : null }
          {data.length > 0 ? <BurgerConstructor props = {data} onShowOrder = {showOrderInfo} /> : null}
         { productInfo && <IngridientDetails onClose={hideProductInfo} itemSelected={itemSelected}/>}
         { orderVisible && <OrderDetails onClose = {hideOrderInfo}/> }
      </div>
    </div>
  );
}

App.propTypes = {
  selectedItem: PropTypes.string,
  orderVisible: PropTypes.func,
  productInfo: PropTypes.func
}

export default App;


