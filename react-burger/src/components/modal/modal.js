import  { useEffect, useCallback} from "react";
import ReactDOM from "react-dom";
import {CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './styles.css';
import {PropTypes} from 'prop-types';

const ModalWindow = (props) => {
    const toggler = props.onHideProduct ? props.onHideProduct : props.onHideOrder;
    return (
        <div className = {'modal-wrapepr'}>
            <div className="modal-close-wrapper">
                <CloseIcon type="primary"  className="btn-close" onClick={toggler}/>
            </div>    
            {props.children}
        </div>
    )
    
}

const Modal = (props) => {
   
    const toggler = props.onHideProduct ? props.onHideProduct : props.onHideOrder;

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
      <div className={"modal"}>     
            {ReactDOM.createPortal(<ModalOverlay onHideOrder = {props.onHideOrder} onHideProduct={props.onHideProduct}/>, portalEl)}
            {ReactDOM.createPortal(<ModalWindow onHideOrder={props.onHideOrder} onHideProduct={props.onHideProduct}>{props.children}</ModalWindow>, portalEl)}
        </div>
    )
}
Modal.propTypes = {
    toggler: PropTypes.bool,
}

export default Modal;