import React, { Fragment } from "react";
import Modal from "../modal/modal";
import PropTypes from 'prop-types';
import styles from "./ingridient-details.module.css";

const IngridientDetails = (props) => {
    
    const itemInfo = {...props.itemSelected}

    return (
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
                        <span className="text text_type_digits-default">    {itemInfo.calories}
                        </span>
                    </div>
                    <div className={styles.ingridient_details_info_item}>
                        <span>Белки, г</span>
                        <span className="text text_type_digits-default">    {itemInfo.proteins}
                        </span>
                    </div>
                    <div className={styles.ingridient_details_info_item}>
                        <span>Жиры, г</span>
                        <span className="text text_type_digits-default">    {itemInfo.fat}
                        </span>
                    </div>
                    <div className={styles.ingridient_details_info_item}>
                        <span>Углеводы, г</span>
                        <span className="text text_type_digits-default">    {itemInfo.carbohydrates}
                        </span>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

IngridientDetails.propTypes = {
    itemSelected: PropTypes.func,
    onClose: PropTypes.func
  }

export default IngridientDetails;