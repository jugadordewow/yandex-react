import styles from "./burger-ingridients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { IIngridient} from './types'
import {useAppSelector} from "../../services/hook";
import {ILocation} from "../../services/types";


const Card: React.FC<IIngridient> = ({_id, image, name, price, item}) => {

    const location = useLocation<ILocation>()

    const bun:any = useAppSelector(state => state.burger.bun)

    const burgerItems:any = useAppSelector(state=> state.burger.items)


    let counter!: number;

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



export default  Card;