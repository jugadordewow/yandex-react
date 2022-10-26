import styles from "./burger-ingridients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {useDispatch, useSelector } from "react-redux";
import { useDrag } from 'react-dnd';
import PropTypes from "prop-types";
import {GET_INGRIDIENT_ITEM} from "../../services/actions/ingridients";
import { Link, useLocation } from 'react-router-dom';


const Card = ({_id, image, name, price, item}) => {

    const dispatch = useDispatch()
    const location = useLocation()

    const bun = useSelector(state => state.burger.bun)

    const burgerItems = useSelector(state=> state.burger.items)


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
        <Link to={{pathname: `/ingredients/${_id}`, state: { background: location } }} className={styles.cardLink}  ref={dragRef}>
                <div className={styles.card}
                     key={_id}
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
        </Link>
    )
}

Card.propTypes = {
    item: PropTypes.object.isRequired,
    name: PropTypes.string,
    _id: PropTypes.string,
    image: PropTypes.any,
    price:PropTypes.number
}

export default  Card;