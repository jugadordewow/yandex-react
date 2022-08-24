import styles from "./burger-ingridients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {useDispatch, useSelector } from "react-redux";
import { useDrag } from 'react-dnd';
import PropTypes from "prop-types";
import {GET_INGRIDIENT_ITEM} from "../../services/actions/ingridients";



const Card = ({_id, image, name, price, item}) => {

    const dispatch = useDispatch()

    const bun = useSelector(state => state.burger.bun)

    const burgerItems = useSelector(state=> state.burger.items)

    const onModal = (item) => {
        dispatch({type: GET_INGRIDIENT_ITEM, payload: item})
    }

    let counter;

    if(bun || burgerItems){
        const arr = [...burgerItems]
        bun && arr.push(bun, bun)
        counter = arr.filter(el => el._id === _id).length
    }

    const [{isDragging}, dragRef] = useDrag({
        type: 'card',
        item: {...item},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            opacity: monitor.isDragging() ? 0.5 : 1,
        })
    })

    return (
        <div className={styles.card}
             key={_id}
             onClick={() => {onModal(item)}}
             ref = {dragRef}
        >
            { counter > 0 && <Counter count={counter} size="default" />}
            <img src ={image} alt={name} />
            <div className={styles.card_price_wrapper}>
                <span className={styles.card_price}>{price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <span className={styles.card_name}>{name}</span>
        </div>
    )
}

Card.propTypes = {
    item: PropTypes.object,
    name: PropTypes.string,
    _id: PropTypes.string,
    image: PropTypes.any,
    price:PropTypes.number
}

export default  Card;