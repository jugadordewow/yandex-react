import { useState, useEffect} from "react";
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon,  Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';


const BurgerConstructor = (props) => {

const [data, setData] = useState(props);

useEffect(() => {setData(props)}, [props]);

const bun = data.props.find(item => item.type === 'bun')

const ingridients = data.props.filter(item => item.type !== 'bun')

 let totalItemsPrice = 2*bun.price;

 const ingridient = ingridients.slice(0,9).map(item => {
  
  totalItemsPrice += item.price

   return (
      
    <div className={styles.ingridientWrapper}
         key={item._id}>
         <DragIcon type="primary" />
          <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              // key={item._id}
            />
        </div>
   )

 })

  return (
  
    <div className={styles.constructorWrapper} >
      <div className={styles.constructor}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name + '(верх)'} 
          key = {bun._id}
          price={bun.price}
          thumbnail={bun.image}
        />

        <div className={styles.constructorIngridientWrapper}>
          {ingridient}
        </div>
        
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name + '(низ)'}
          price={bun.price}
          thumbnail={bun.image}
          key={bun._id+1}
        />
      </div>
      <div className = {styles.constructorPriceFooter}>
          <div className = {styles.totalPriceText} >
              <p className={styles.totalPriceTextP } >
                  {totalItemsPrice}
              </p>
              <CurrencyIcon type="primary" />    
          </div>
          
           <Button type="primary" size="large" onClick={props.onShowOrder}>
                Заказать
           </Button>
      </div>

    </div>

  )
 }

 BurgerConstructor.propTypes = {
  props: PropTypes.array.isRequired,
}

export default BurgerConstructor;

