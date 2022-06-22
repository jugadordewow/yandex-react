import  { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import {CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from '../oder-details/order-details';
import IngridientDetails from "../ingridient-details/ingridient-details";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './styles.css';



const Modal = (props) => {
    
    const [display, setDisplay] = useState(props.modal);

    const onDisplay = () => {
        setDisplay(display => props.modal)
    }

    console.log(props.modal)

    console.log(display)

    return (
        
      <div className={"modal " + display}>
           
            <ModalOverlay onClick={() => setDisplay('hidden')} />
                <div className = {'modal-wrapepr'}>
                    <CloseIcon type="primary" 
                    onClick={() => setDisplay('hidden')}
                    className="btn-close" />
                    {props.children}
                </div>
           
     </div>
    )
}

const Portal = (props) => {

    const node = document.querySelector('#modal');
    document.body.appendChild(node);
    return ReactDOM.createPortal(props.children, node);

}

export default Modal;