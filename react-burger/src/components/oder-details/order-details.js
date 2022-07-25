<<<<<<< HEAD
import styles from './order-details.module.css';
=======
import {useState, useEffect} from 'react';
import styles from './styles.css';
>>>>>>> 0186b68ea8d4088e9e0850fa5d89c9877376a4f1
import done from '../../images/done.png';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';

const OrderDetails = (props) => {

<<<<<<< HEAD
    return (
       <Modal onClose={props.onClose} >
            <div className={styles.order_details_wrapper}>
                <div className={styles.order_details_id + " text_type_digits-large"}>034536</div>
                <div className={styles.order_details_id_text}>
                    идентификатор заказа
                </div>
                <div className={styles.order_details_check_btn}>
                    <img src={done} alt="done-icon"/>
                </div>
                <div className={styles.order_details_info_active}>
                    Ваш заказ начали готовить
                </div>
                <div className={styles.order_details_info}>
                    Дождитесь готовности на орбитальной станции
                </div>
            </div>
        </Modal>  
=======
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
>>>>>>> 0186b68ea8d4088e9e0850fa5d89c9877376a4f1
    )
}

OrderDetails.propTypes = {
    onClose: PropTypes.func,
  }

export default OrderDetails;