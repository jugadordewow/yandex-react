import React, {FC} from 'react';
import { Switch, Route, useLocation, useHistory} from "react-router-dom";
import { useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import {HomePage, Login, ResetPassword, Registration, ForgotPassword, Page404, ProfilePage, IngridientPage } from '../../pages';
import IngridientDetails from "../ingridient-details/ingridient-details";
import {loadIngridients} from "../../services/actions/ingridients";
import Modal from "../modal/modal";
import { ProtectedRoute } from '../protected-route';
import {useAppDispatch} from "../../services/hook";
import {ProfilePageOrders} from "../../pages/profile/profile-orders";
import ProfilePageOrder from "../../pages/profile/profile-order";
import FeedPage from "../../pages/feed-page/feed";



const App:React.FC = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(loadIngridients())
    }, [])
    

    const location = useLocation<any>();
    const history = useHistory<any>();
    const modal = (window.history.state != null) ? (window.history.state.modal || false) : false;
    const background = location.state && location.state.background;
    const returnFromModal = () => {
        history.goBack();
    };


    // @ts-ignore
    // @ts-ignore
    return (

        <div className={styles.App}>

            <AppHeader/>
            <div className={styles.main}>
                    <Switch location={background || location}>
                        <Route path="/" exact={true} >
                            <HomePage />
                        </Route>
                        <Route path="/feed" exact={true}>
                            <FeedPage />
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
                         { (!modal) ? <IngridientPage /> : <HomePage/> }
                        </Route>

                        <ProtectedRoute path="/profile" exact={true}>
                            <ProfilePage />
                        </ProtectedRoute>
                        <ProtectedRoute path="/profile/orders" exact={true}>
                            <ProfilePageOrders />
                        </ProtectedRoute>
                        <ProtectedRoute  path='/profile/orders/:id' exact={true}>
                            { (!background) ? <ProfilePageOrder /> : <ProfilePageOrders /> }
                        </ProtectedRoute >


                        <Route path="*" exact={true} >
                            <Page404 />
                        </Route>
                    </Switch>
                {background && (
                    <Route path='/ingredients/:id' exact={true}>
                        <Modal onClose={returnFromModal}>
                            <IngridientDetails itemId={'/ingredients/:id'}/>
                        </Modal>
                    </Route>
                )}
            </div>
        </div>

    );
}

export default App;