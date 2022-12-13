import {FC} from "react";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../services/hook";
import {TOrder} from "../../services/types";
import {getOrderDate} from "../../utils/order-dates";

type TFeedDetails = {
    isAuthorized: true;
}

const FeedDetails:FC<TFeedDetails> = ({isAuthorized}) => {

    const id = useParams();
    const orders =  useAppSelector(state => (isAuthorized) ? state.wsUserData.data : state.wsData.data)
    const ingridients = useAppSelector(state => state.ingredients.items)

    let order = (orders.length > 0) && orders.find((item:TOrder) => item.number == id);
    const date = (order) ? getOrderDate(order) : null;
    const status : {name:string, style:string} = (order && (order.status === 'done')) ? {name:'Выполнен', style:'done'}
        : (order && (order.status === 'pending')) ? {name:'Создан', style:'pending'}
            : (order && (order.status === 'created')) ? {name:'Готовится', style:'created'}
                : { name: 'Отменён', style:'cancel' };

    return (
        <>
        </>
    )
}

export default FeedDetails;