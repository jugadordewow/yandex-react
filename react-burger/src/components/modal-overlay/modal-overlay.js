import styles from './modal-overlay.module.css';
import {PropTypes} from 'prop-types';
import Modal from "../modal/modal";

const  ModalOverlay = (props) => {
    const toggler = props.onClose ? props.onClose : null;
    return (
        <div className={styles.modal_overlay_wrapper}
             onClick={toggler}>
        </div>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;