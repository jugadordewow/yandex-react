import  { useEffect, useCallback} from "react";
import ReactDOM from "react-dom";
import {CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css';
import {PropTypes} from 'prop-types';

const ModalWindow = (props) => {
    const toggler = props.onClose ? props.onClose : null;
    return (
        <div className = {styles.modal_wrapepr}>
            <div className={styles.modal_close_wrapper} >
                <CloseIcon type="primary"  className="btn-close" onClick={toggler}/>
            </div>    
            {props.children}
        </div>
    )
    
}

const Modal = (props) => {
   
    const toggler = props.onClose ? props.onClose : null;

    const onPressEsc = useCallback((e) => {
        if(e.key === 'Escape') {
            toggler();
        }
    }, [toggler]);

    useEffect(() => {
        document.addEventListener('keyup', onPressEsc);
        return () => {
            document.removeEventListener('keyup', onPressEsc);
        }
    }, [onPressEsc]);

    const portalEl = document.getElementById('modal');
    
    return (
      <div className={styles.modal}>     
        
            {ReactDOM.createPortal(
            <>
                <ModalOverlay  onClose={props.onClose}/>
                <ModalWindow onClose={props.onClose}>
                    {props.children}
                </ModalWindow>
            </>, portalEl)}
        </div>
    )
}
Modal.propTypes = {
    toggler: PropTypes.bool,
}

export default Modal;