import React, { Fragment } from "react";
import Modal from "../modal/modal";
import PropTypes from 'prop-types';
import styles from "./styles.css";

const IngridientDetails = (props) => {
    const itemInfo = {...props.itemSelected}
    console.log(itemInfo)
    return (
        <Modal onHideProduct={props.onHideProduct} itemSelected={props.itemSelected}>
            <h3 className="ingridient-detailes-heading">Детали ингридиента</h3>
            <div className="ingridient-item-wrapper">
                <div className="ingridient-item-img">
                    <img src={itemInfo.image_large} alt="ingridient-img"/>
                </div>
                 <div className="ingridient-item-name">
                    {itemInfo.name}
                </div>
                <div className="ingridient-details-info-wrapper">
                    <div className="ingridient-details-info-item">
                        <span>Калории,ккал</span>
                        <span className="text text_type_digits-default">    {itemInfo.calories}
                        </span>
                    </div>
                    <div className="ingridient-details-info-item">
                        <span>Белки, г</span>
                        <span className="text text_type_digits-default">    {itemInfo.proteins}
                        </span>
                    </div>
                    <div className="ingridient-details-info-item">
                        <span>Жиры, г</span>
                        <span className="text text_type_digits-default">    {itemInfo.fat}
                        </span>
                    </div>
                    <div className="ingridient-details-info-item">
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
    props: PropTypes.array
  }

export default IngridientDetails;