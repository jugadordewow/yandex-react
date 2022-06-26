import styles from './order-details.module.css';
import done from '../../images/done.png';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';

const OrderDetails = (props) => {

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
    )
}

OrderDetails.propTypes = {
    onClose: PropTypes.func,
  }

export default OrderDetails;