import React, { Fragment } from "react";
import styles from "./ingridient-details.module.css";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {IIngridientId, IIngridientDetail, IIngridientState} from "./types";



const IngridientDetails:React.FC<IIngridientId> = ({itemId}) => {

    const { id } = useParams<any>();
    const itemsInfo = useSelector<IIngridientState>(state => state.ingridients.items)
    // @ts-ignore
    const itemModalInfo = (itemsInfo.length > 0 ) ? itemsInfo.find(i => i._id === id) : null;
    // @ts-ignore
    const itemPageInfo = (itemsInfo.length > 0 &&  itemId) ? itemsInfo.find(i => i._id === itemId) : null;
    const modalStyles = styles.ingridient_detailes_heading;
    const pageStyles = styles.ingridient_detailes_page_heading;
    const itemInfo = itemModalInfo || itemPageInfo
    const headerStyles = itemId ? pageStyles : modalStyles;


    return (
        (itemInfo) && (
            <>
            <h3 className={headerStyles}>Детали ингридиента</h3>
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
                        <span className={styles.text_type_digits_default}>{itemInfo.calories}
                        </span>
                    </div>
                    <div className={styles.ingridient_details_info_item}>
                        <span>Белки, г</span>
                        <span className={styles.text_type_digits_default}>{itemInfo.proteins}
                        </span>
                    </div>
                    <div className={styles.ingridient_details_info_item}>
                        <span>Жиры, г</span>
                        <span className={styles.text_type_digits_default}>{itemInfo.fat}
                        </span>
                    </div>
                    <div className={styles.ingridient_details_info_item}>
                        <span>Углеводы, г</span>
                        <span className={styles.text_type_digits_default}> {itemInfo.carbohydrates}
                        </span>
                    </div>
                </div>
            </div>
        </>)

    )
}


export default IngridientDetails;