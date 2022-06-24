import styles from './styles.css';

const  ModalOverlay = (props) => {
    const toggler = props.onHideProduct ? props.onHideProduct : props.onHideOrder;
    return (
        <div className="modal-overlay-wrapper" 
             onClick={toggler}>
            
        </div>
    )
} 

export default ModalOverlay;