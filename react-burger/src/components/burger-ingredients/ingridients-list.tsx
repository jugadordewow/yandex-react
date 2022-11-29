import styles from "./burger-ingridients.module.css";
import React, {forwardRef} from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import Card from "./card";
import {IIngridientsList, IIngridientsState} from './types'


const IngridientsList = forwardRef<HTMLElement, IIngridientsList>(({name, type}, ref) => {

    const data:any = useSelector<IIngridientsState>(state => state.ingridients.items)

    return (
        <section ref={ref}>
            <h2 className={styles.section_name}>{name}</h2>
            <div className={styles.card_items_wrapper}>
                {data.filter((item: { type: string; }) => item.type.match(type)).map(
                    (item: object)=>{
                        const {_id, name, price, image}:any = {...item};
                        return (
                            <Card _id = {_id}
                                  name = {name}
                                  price = {price}
                                  image = {image}
                                  item = {item}
                                  key={_id}
                            />
                        )
                    }
                )}
            </div>
        </section>
    )
})


export default IngridientsList;

