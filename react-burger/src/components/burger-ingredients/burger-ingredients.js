import React, { Fragment, useState, useEffect, useRef, setState } from "react";
import PropTypes from 'prop-types';
import { render } from "@testing-library/react";
import styles from './burger-ingridients.module.css';
import { Tab, Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";


const Tabs = () => {
 
    const [current, setCurrent] = React.useState('one')
    return (
      <div className={styles.tabs_wrapper_dashed}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent} >
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent} className="tab-border">
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent} >
          Начинки
        </Tab>
      </div>
    )
  }




const BurgerIngredients = (props) => {

  const [data, setData] = useState(props);
    
    const cardMain = data.props.filter(item => item.type.match('main')).map(
      item => {
        const {_id, name, type, price, image, image_mobile, image_large} = item;
        console.log(styles.card)
        return (
              <div className={styles.card} 
              onClick = {() => {props.onItemSelected(_id);
                                props.onShowProduct()}} 
              key={_id} >
                  <Counter count={1} size="default" />
                  <img src ={image} alt={name} />
                  <div className={styles.card_price_wrapper}>
                  <span className={styles.card_price}>{price}</span>
                  <CurrencyIcon type="primary" />
            </div>
            <span className={styles.card_name}>{name}</span>
        </div>
         )
      }
    );

    const cardBun = data.props.filter(item => item.type.match('bun')).map(
      item => {
        const {_id, name, type, price, image, image_mobile, image_large} = item;
      
        return (
          <div className={styles.card} 
                onClick = {() => { props.onItemSelected(_id);
                                   props.onShowProduct()}} 
                key={_id} >
              <Counter count={1} size="default" />
              <img src ={image} alt={name} />
              <div className={styles.card_price_wrapper}>
                <span className={styles.card_price}>{price}</span>
                <CurrencyIcon type="primary" />
              </div>
              <span className={styles.card_name}>{name}</span>
              
          </div>
         )
      }
    );


    const cardSauce = data.props.filter(item => item.type.match('sauce')).map(
      item => {
        const {_id, name, type, price, image, image_mobile, image_large} = item;
        return (
          <div className={styles.card}  
                onClick = {() => {props.onItemSelected(_id);
                                  props.onShowProduct()}} 
                key={_id} >
                  <Counter count={1} size="default" />
                  <img src ={image} alt={name} />
                  <div className={styles.card_price_wrapper}>
                      <span className={styles.card_price}>{price}</span>
                      <CurrencyIcon type="primary" />
                  </div>
              <span className={styles.card_name}>{name}</span>
        
    </div>
         )
      }
    );
  
    return(
        <div className={styles.burger_ingridients_wrapper}>
           <div className={styles.main_header}>
                <h1 className={styles.text_type_main_large}>Соберите бургер </h1>
           </div>
            <Tabs />
            <div className={styles.ingridients_items_wrapper}>
                <section>
                  <h2 className={styles.section_name}>Булки</h2>
                  <div className={styles.card_items_wrapper}>
                      {cardBun}
                  </div>
                </section>
                <section>
                  <h2 className={styles.section_name}>Соусы</h2>
                  <div className={styles.card_items_wrapper}>
                      {cardSauce}
                  </div>
                </section>
                <section>
                  <h2 className={styles.section_name}>Начинка</h2>
                  <div className={styles.card_items_wrapper}>
                      {cardMain}
                  </div>
                </section>
            </div>
            
            
        </div>
    );
}


BurgerIngredients.propTypes = {
  props: PropTypes.array.isRequired,
  onItemSelected: PropTypes.func.isRequired,
  onShowProduct: PropTypes.func.isRequired
}



export default BurgerIngredients;