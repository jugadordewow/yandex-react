import React from 'react';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import OrderDetails from '../../components/oder-details/order-details';
import IngridientDetails from '../../components/ingridient-details/ingridient-details';
import {useDispatch, useSelector} from "react-redux";
import {loadIngridients, RESET_INGRIDIENT_ITEM} from "../../services/actions/ingridients";
import Modal from "../../components/modal/modal";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {ORDER_RESET} from "../../services/actions/order";
import {RESET_CONSTRUCTOR} from "../../services/actions/constructor";


interface IIngridient {
    ingridients: {
        item: {
                _id:string,
                calories:number,
                carbohydrates:number,
                fat:number,
                image:string,
                image_large:string,
                image_mobile:string,
                name:string,
                price:number,
                proteins:number,
                type:string,
        }
    }
}

interface IOrder {
    orders: {
        order: {
            name: string,
            number: number
        }
    }
}
const HomePage:React.FC = () => {

    const dispatch = useDispatch<any>()

    const productInfo = useSelector<IIngridient>(state => state.ingridients.item)

    const orderInfo = useSelector<IOrder>(state => state.orders.order)

    const handleClose = () => {
        productInfo &&  dispatch({type: RESET_INGRIDIENT_ITEM})
        orderInfo && dispatch({type: ORDER_RESET})
        orderInfo &&   dispatch({type: RESET_CONSTRUCTOR})
    }


    return (
        <>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor />
                </DndProvider>
                { productInfo && <Modal onClose={handleClose}><IngridientDetails/></Modal>}
                { orderInfo && <Modal onClose={handleClose}><OrderDetails/></Modal> }
        </>
    );
}

export default  HomePage;