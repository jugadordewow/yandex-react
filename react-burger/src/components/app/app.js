import React from 'react';
import { useEffect, useState } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../oder-details/order-details';
import IngridientDetails from '../ingridient-details/ingridient-details';
import {useDispatch, useSelector} from "react-redux";
import {loadIngridients, RESET_INGRIDIENT_ITEM} from "../../services/actions/ingridients";
import Modal from "../modal/modal";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {ORDER_RESET} from "../../services/actions/order";
import {RESET_CONSTRUCTOR} from "../../services/actions/constructor";


const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadIngridients())
    }, [])

    const productInfo = useSelector(state => state.ingridients.item)

    const orderInfo = useSelector(state => state.orders.order)

    const handleClose = () => {
        productInfo &&  dispatch({type: RESET_INGRIDIENT_ITEM})
        orderInfo && dispatch({type: ORDER_RESET})
        orderInfo &&   dispatch({type: RESET_CONSTRUCTOR})
    }


    return (
        <div className={styles.App}>
            <AppHeader/>
            <div className={styles.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor />
                </DndProvider>
                { productInfo && <Modal onClose={handleClose}><IngridientDetails /></Modal>}
                { orderInfo && <Modal onClose={handleClose}><OrderDetails/></Modal> }
            </div>
        </div>
    );
}

export default App;