import {useState, useEffect} from 'react';
import styles from './styles.css';
import done from '../../images/done.png';
import iconCheck from '../../images/icon-check.png';

const OrderDetails = (props) => {

    const [order, setOrder] = useState(null)

    console.log(props)

    return (
        <div className="order-details-wrapepr">
            <div className="order-details-id text_type_digits-large">034536</div>
            <div className="order-details-id-text">идентификатор заказа</div>
            <div className="order-details-check-btn">
                <img src={done}/>
            </div>
            <div className="order-details-info-active">Ваш заказ начали готовить</div>
            <div className="order-details-info">Дождитесь готовности на орбитальной станции</div>
        </div>
    )
}


export default OrderDetails;