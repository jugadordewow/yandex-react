import React, {FC} from 'react';
import { Switch, Route, useLocation, useHistory} from "react-router-dom";
import { useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import {HomePage, Login, ResetPassword, Registration, ForgotPassword, Page404, ProfilePage, IngridientPage, ProfilePageOrder, OrderFeedPage, ProfilePageOrders, ProfileOrder, FeedPage } from '../../pages';
import IngridientDetails from "../ingridient-details/ingridient-details";
import {loadIngridients} from "../../services/actions/ingridients";
import Modal from "../modal/modal";
import { ProtectedRoute } from '../protected-route';
import {useAppDispatch} from "../../services/hook";
import FeedDetails from "../feed/FeedDetails";



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
                        <Route path="/feed/:id" exact={true}>
                            { (modal) ? <FeedDetails isAuthorized={false} isModal={true}/> : <OrderFeedPage />  }
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
                            { (!modal) ? <ProfilePageOrder /> : <ProfilePageOrders /> }
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
                {background && (
                    <Route path='/feed/:id' exact={true}>
                        <Modal onClose={returnFromModal}>
                            <FeedDetails isAuthorized={false} isModal={true}/>
                        </Modal>
                    </Route>
                )}
                {background && (
                    <Route path='/profile/orders/:id' exact={true}>
                        <Modal onClose={returnFromModal}>
                            <FeedDetails isAuthorized={true} isModal={true}/>
                        </Modal>
                    </Route>
                )}
            </div>
        </div>

    );
}

export default App;