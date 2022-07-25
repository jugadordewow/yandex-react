import  { useEffect, useCallback} from "react";
import ReactDOM from "react-dom";
import {CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
<<<<<<< HEAD
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css';
import {PropTypes} from 'prop-types';
=======
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
>>>>>>> 0186b68ea8d4088e9e0850fa5d89c9877376a4f1

const ModalWindow = (props) => {
    const toggler = props.onClose ? props.onClose : null;
    return (
<<<<<<< HEAD
        <div className = {styles.modal_wrapepr}>
            <div className={styles.modal_close_wrapper} >
                <CloseIcon type="primary"  className="btn-close" onClick={toggler}/>
            </div>    
            {props.children}
        </div>
=======
        
      <div className={"modal " + display}>
           
            <ModalOverlay onClick={() => setDisplay('hidden')} />
                <div className = {'modal-wrapepr'}>
                    <CloseIcon type="primary" 
                    onClick={() => setDisplay('hidden')}
                    className="btn-close" />
                    {props.children}
                </div>
           
     </div>
>>>>>>> 0186b68ea8d4088e9e0850fa5d89c9877376a4f1
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
    
    return ReactDOM.createPortal(
                <div className={styles.modal}>
                    <ModalOverlay  onClose={props.onClose}/>
                    <ModalWindow onClose={props.onClose}>
                        {props.children}
                    </ModalWindow>
                </div>, portalEl)

}
Modal.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default Modal;