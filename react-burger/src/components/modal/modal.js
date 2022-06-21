import  { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import {CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
//import OrderDetails from '../oder-details/order-details';
//import IngridientDetails from "../ingridient-details/ingridient-details";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './styles.css';

const Modal = (props) => {

    const [display, setDisplay] = useState('hidden');

    console.log(display, props.children)

    const close = useRef();

    useEffect(()=> {
        onDisplay()
    }, [display])

    // useEffect(() => {
    //     window.addEventListener('click', onClose);

    //     return () => {
    //         window.removeEventListener('click');
    //     }
    // })

    const onDisplay = () => {
        if(props.children) {
            setDisplay('active')
        }
    }

    const onClose = () => {
        setDisplay('hidden');
    }

    return (
      <div className={"modal " + display}>
             
            <ModalOverlay onClick={() => onClose} />
                <div className = {'modal-wrapepr'}>
                    <CloseIcon type="primary"  ref = {close} className="btn-close" />
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