import styles from './styles.css';
import done from '../../images/done.png';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';

const OrderDetails = (props) => {

    return (
       <Modal onHideOrder={props.onHideOrder} >
            <div className="order-details-wrapepr">
                <div className="order-details-id text_type_digits-large">034536</div>
                <div className="order-details-id-text">идентификатор заказа</div>
                <div className="order-details-check-btn">
                    <img src={done} alt="done-icon"/>
                </div>
                <div className="order-details-info-active">Ваш заказ начали готовить</div>
                <div className="order-details-info">Дождитесь готовности на орбитальной станции</div>
            </div>
        </Modal>  
    )
}

OrderDetails.propTypes = {
    props: PropTypes.array
  }

export default OrderDetails;