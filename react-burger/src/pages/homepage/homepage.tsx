import React from 'react';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import OrderDetails from '../../components/oder-details/order-details';
import IngridientDetails from '../../components/ingridient-details/ingridient-details';
import FeedDetails from "../../components/feed/FeedDetails";
import {RESET_INGRIDIENT_ITEM} from "../../services/actions/ingridients";
import Modal from "../../components/modal/modal";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {ORDER_RESET} from "../../services/actions/order";
import {RESET_CONSTRUCTOR} from "../../services/actions/constructor";
import {useAppDispatch, useAppSelector} from "../../services/hook";
import {LoadingElem} from "../../services/skeleton";


const HomePage:React.FC = () => {

    const dispatch = useAppDispatch()

    const productInfo = useAppSelector(state => state.ingredients.item)

    const orderInfo = useAppSelector(state => state.orders.order)

    const orderRequest = useAppSelector(state => state.orders.orderRequest)


    const handleClose = () => {
        productInfo &&  dispatch({type: RESET_INGRIDIENT_ITEM})
        orderInfo && dispatch({type: ORDER_RESET})
        orderInfo &&  dispatch({type: RESET_CONSTRUCTOR})
    }


    return (
        <>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor />
                </DndProvider>
                { productInfo && <Modal onClose={handleClose}><IngridientDetails/></Modal>}
                { orderInfo && <Modal onClose={handleClose}><OrderDetails/></Modal> }
                {orderRequest && <Modal onClose={handleClose}><LoadingElem/></Modal>}
        </>
    );
}

export default  HomePage;