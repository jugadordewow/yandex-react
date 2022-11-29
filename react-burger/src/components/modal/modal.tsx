import React, { useEffect, useCallback} from "react";
import ReactDOM from "react-dom";
import {CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css';
import {IModal} from "./types";

const Modal: React.FC<IModal> = (props) => {

    const toggler = props.onClose ? props.onClose : undefined;

    const onPressEsc = useCallback((e:any) => {
        if(e.key === 'Escape') {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            toggler;
        }
    }, [toggler]);

    useEffect(() => {
        document.addEventListener('keyup', onPressEsc);
        return () => {
            document.removeEventListener('keyup', onPressEsc);
        }
    }, [onPressEsc]);

    const portalEl:any = document.getElementById('modal');
    
    // @ts-ignore
    return ReactDOM.createPortal(
                <div className={styles.modal}>
                    <ModalOverlay  onClose={toggler}/>
                    <div className = {styles.modal_wrapepr}>
                        <div className={styles.modal_close_wrapper} >
                            <CloseIcon type="primary"  className="btn-close" onClick={toggler}/>
                        </div>
                        {props.children}
                    </div>
                </div>, portalEl)

}

export default Modal;

