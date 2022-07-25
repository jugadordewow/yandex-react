import {useState, useEffect} from 'react';
import React, { Fragment } from "react";
import Modal from "../modal/modal";
<<<<<<< HEAD
import PropTypes from 'prop-types';
import styles from "./ingridient-details.module.css";

const IngridientDetails = (props) => {
    
    const itemInfo = {...props.itemSelected}
=======

const IngridientDetails = (props) => {
>>>>>>> 0186b68ea8d4088e9e0850fa5d89c9877376a4f1

    const [details, setDetails] = useState(null);

    console.log(props)

    return (
<<<<<<< HEAD
        <Modal  onClose={props.onClose}  itemSelected={props.itemSelected}>
            <h3 className={styles.ingridient_detailes_heading }>Детали ингридиента</h3>
            <div className={styles.ingridient_item_wrapper}>
                <div>
                    <img src={itemInfo.image_large} alt="ingridient-img"/>
                </div>
                 <div className={styles.ingridient_item_name}>
                    {itemInfo.name}
                </div>
                <div className={styles.ingridient_details_info_wrapper}>
                    <div className={styles.ingridient_details_info_item}>
                        <span>Калории,ккал</span>
                        <span className={styles.text_type_digits_default}>    {itemInfo.calories}
                        </span>
                    </div>
                    <div className={styles.ingridient_details_info_item}>
                        <span>Белки, г</span>
                        <span className={styles.text_type_digits_default}>    {itemInfo.proteins}
                        </span>
                    </div>
                    <div className={styles.ingridient_details_info_item}>
                        <span>Жиры, г</span>
                        <span className={styles.text_type_digits_default}>    {itemInfo.fat}
                        </span>
                    </div>
                    <div className={styles.ingridient_details_info_item}>
                        <span>Углеводы, г</span>
                        <span className={styles.text_type_digits_default}>    {itemInfo.carbohydrates}
                        </span>
                    </div>
                </div>
=======
       
            <div className="ingridient-item-wrapper">
                
>>>>>>> 0186b68ea8d4088e9e0850fa5d89c9877376a4f1
            </div>
      
    )
}

<<<<<<< HEAD
IngridientDetails.propTypes = {
    itemSelected: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
  }

=======
>>>>>>> 0186b68ea8d4088e9e0850fa5d89c9877376a4f1
export default IngridientDetails;