import React, { Fragment } from "react";
import styles from "./ingridient-details.module.css";
import {useSelector} from "react-redux";

const IngridientDetails = () => {

    const itemInfo = useSelector(state => state.ingridients.item)

    return (
        <>
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
            </div>    
        </>
    )
}


export default IngridientDetails;