import React, { Fragment, useState, useEffect, useRef, setState } from "react";
import { render } from "@testing-library/react";
import styles from './styles.css';
import { Tab, Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";



const Tabs = () => {
 
    const [current, setCurrent] = React.useState('one')
    return (
      <div style={{ display: 'flex' }} className="tabs-wrapper-dashed">
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
        return (
              <div className="card-item" 
              onClick = {() => {props.onItemSelected(_id)}} 
              key={_id}>
                  <Counter count={1} size="default" />
                  <img src ={image} alt={name} />
                  <div className="card-price-wrapper">
                  <span className="card-price">{price}</span>
                  <CurrencyIcon type="primary" />
            </div>
            <span className="card-name">{name}</span>
        </div>
         )
      }
    );

    const cardBun = data.props.filter(item => item.type.match('bun')).map(
      item => {
        const {_id, name, type, price, image, image_mobile, image_large} = item;
      
        return (
          <div className="card-item" 
                onClick = {() => { props.onItemSelected(_id)}} 
                key={_id}>
              <Counter count={1} size="default" />
              <img src ={image} alt={name} />
              <div className="card-price-wrapper">
                <span className="card-price">{price}</span>
                <CurrencyIcon type="primary" />
              </div>
              <span className="card-name">{name}</span>
              
          </div>
         )
      }
    );


    const cardSauce = data.props.filter(item => item.type.match('sauce')).map(
      item => {
        const {_id, name, type, price, image, image_mobile, image_large} = item;
        return (
          <div className="card-item" 
                onClick = {() => {props.onItemSelected(_id)}} 
                key={_id}>
                  <Counter count={1} size="default" />
                  <img src ={image} alt={name} />
                  <div className="card-price-wrapper">
                      <span className="card-price">{price}</span>
                      <CurrencyIcon type="primary" />
                  </div>
              <span className="card-name">{name}</span>
        
    </div>
         )
      }
    );
  
    return(
        <div className="burger-ingridients-wrapper">
           <header className="main-header">
                <h1 className="text text_type_main-large">Соберите бургер </h1>
           </header>
            <Tabs />
            <section>
              <h2 className="section-name text text_type_main-medium">Булки</h2>
              <div className="card-items-wrapper">
                  {cardBun}
              </div>
            </section>
            <section>
              <h2 className="section-name text text_type_main-medium">Соусы</h2>
              <div className="card-items-wrapper">
                  {cardSauce}
              </div>
            </section>
            <section>
              <h2 className="section-name text text_type_main-medium">Начинка</h2>
              <div className="card-items-wrapper">
                  {cardMain}
              </div>
            </section>
            
            
            
        </div>
    );
}

export default BurgerIngredients;