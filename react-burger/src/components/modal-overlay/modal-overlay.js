import styles from './modal-overlay.module.css';

const  ModalOverlay = (props) => {
    const toggler = props.onClose ? props.onClose : null;
    return (
        <div className={styles.modal_overlay_wrapper}
             onClick={toggler}>
            
        </div>
    )
} 

export default ModalOverlay;