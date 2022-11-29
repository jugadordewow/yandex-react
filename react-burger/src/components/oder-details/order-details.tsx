import styles from './order-details.module.css';
import done from '../../images/done.png';
import {useSelector} from "react-redux";

interface OrderDetails {
    orders: {
        order: {
            order:{
                number?: string
            }
        }
    }
}

const OrderDetails = () => {

    const orderNum:any = useSelector<OrderDetails>(state => state.orders.order.order.number)

    return (
        <div className={styles.order_details_wrapper}>
            <div className="order-details-id text_type_digits-large">{orderNum}</div>
            <div className="order-details-id-text">идентификатор заказа</div>
            <div className={styles.order_details_check_btn}>
                <img src={done}/>
            </div>
            <div className={styles.order_details_info_active}>Ваш заказ начали готовить</div>
            <div className={styles.order_details_info}>Дождитесь готовности на орбитальной станции</div>
        </div>

    )
}


export default OrderDetails;