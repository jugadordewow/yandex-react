import React from 'react';
import {BrowserRouter as Router, Switch, Route, useLocation, useHistory} from "react-router-dom";
import { useEffect, useState } from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import {HomePage, Login, ResetPassword, Registration, ForgotPassword, Page404, ProfilePage, IngridientPage } from '../../pages';
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
import { ProtectedRoute } from '../protected-route';



const App = () => {

    console.log(useLocation)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadIngridients())
    }, [])
    //
    // const productInfo = useSelector(state => state.ingridients.item)
    //
    // const orderInfo = useSelector(state => state.orders.order)
    //
    // const handleClose = () => {
    //     productInfo &&  dispatch({type: RESET_INGRIDIENT_ITEM})
    //     orderInfo && dispatch({type: ORDER_RESET})
    //     orderInfo &&   dispatch({type: RESET_CONSTRUCTOR})
    // }

    const location = useLocation();
    const history = useHistory();
    const modal = (window.history.state != null) ? (window.history.state.modal || false) : false;
    const background = location.state && location.state.background;
    const returnFromModal = () => {
        history.goBack();
    };


    return (

        <div className={styles.App}>

            <AppHeader/>
            <div className={styles.main}>
                    <Switch location={background || location}>
                        <Route path="/" exact={true} >
                            <HomePage />
                        </Route>
                        <Route path="/login" exact={true} >
                            <Login />
                        </Route>
                        <Route path="/reset-password" exact={true} >
                            <ResetPassword />
                        </Route>
                        <Route path="/register" exact={true} >
                            <Registration />
                        </Route>
                        <Route path="/forgot-password" exact={true} >
                            <ForgotPassword />
                        </Route>
                        <Route path="/ingredients/:id" exact={true}>
                            { (!modal) ? <IngridientPage /> : <HomePage modal={modal} /> }
                        </Route>
                        <ProtectedRoute path="/profile" exact={false}>
                            <ProfilePage />
                        </ProtectedRoute>
                        <Route path="*" exact={true} >
                            <Page404 />
                        </Route>
                    </Switch>
                {background && (
                    <Route path='/ingredients/:id' exact={true}>
                        <Modal onClose={returnFromModal}>
                            <IngridientDetails />
                        </Modal>
                    </Route>
                )}
            </div>
        </div>

    );
}

export default App;