import styles from './modal-overlay.module.css';
import React from "react";
import {IModal} from "../modal/types";


const  ModalOverlay: React.FC<IModal> = ({onClose}) => {

    return (
        <div className={styles.modal_overlay_wrapper}
             onClick={onClose}>
        </div>
    )
}



export default ModalOverlay;