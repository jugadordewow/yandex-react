import { useState, useEffect} from "react";
import { ConstructorElement, DragIcon, CurrencyIcon,  Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.css';


const BurgerConstructor = (props) => {

const [data, setData] = useState(props);

useEffect(() => {setData(props)}, [props]);

const bun = data.props.find(item => item.type === 'bun')

const ingridients = data.props.filter(item => item.type !== 'bun')

 let totalItemsPrice = 2*bun.price;

 const ingridient = ingridients.slice(0,5).map(item => {

  totalItemsPrice += item.price

   return (
      
    <div className="ingridient-wrapper">
         <DragIcon type="primary" />
          <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              key={item.id}
            />
        </div>
   )

 })

  return (
  
    <div className="constructor-wrapper">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name} 
          key = {bun.id}
          price={bun.price}
          thumbnail={bun.image}
        />
        
        {ingridient}
        
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name}
          price={bun.price}
          thumbnail={bun.image}
          key={bun.id}
        />
      </div>
      <div className = "constructor-price-footer">
          <div className = "total-price-text">
              <p className="text text_type_main-default">
                  {totalItemsPrice}
              </p>
              <CurrencyIcon type="primary" />    
          </div>
          
           <Button type="primary" size="large" onClick = {() => props.setOrder(true)}>
                Заказать
           </Button>
      </div>

    </div>

  )
 }

export default BurgerConstructor;

