import React, {useCallback, useMemo} from "react";
import PropTypes from 'prop-types';
import {CurrencyIcon,  Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-constructor.module.css';
import {Bun, Ingridient} from "./ingridient-item";
import {useDispatch, useSelector} from "react-redux";
import {v4 as uidKey} from 'uuid'
import {useDrop} from "react-dnd";
import {loadOrder} from "../../services/actions/order";
import {ADD_BUN_CONSTRUCTOR,
        ADD_INGRIDIENT_CONSTRUCTOR,
        MOVE_INGRIDIENT_CONSTRUCTOR,
        } from "../../services/actions/constructor";
import {useHistory} from "react-router-dom";
import {ICard, IItem, IConstructorState, ICardProps} from './types'
import {useAppDispatch, useAppSelector} from "../../services/hook";

const BurgerConstructor:React.FC = () => {

    const dispatch = useAppDispatch()
    const history = useHistory<any>()

    const items = useAppSelector(state => state.burger.items)

    const bun = useAppSelector(state => state.burger.bun)

    const addIngridient = (item:IItem) => {
       if (item.type === 'bun') {
            dispatch({type: ADD_BUN_CONSTRUCTOR, payload: item})
       } else {
            dispatch({type: ADD_INGRIDIENT_CONSTRUCTOR, payload: item})
       }
    }


    const [{isOver}, dropRef] = useDrop({
        accept:'card',
        drop: (item: IItem) => {
            item.uid = uidKey()
            addIngridient(item)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })


    const [,dropItemRef ] = useDrop({
        accept: 'ingridient',
        drop:(item:IItem) => {
            item.uid = uidKey()
        },
        collect:(monitor) => ({
            isOver:monitor.isOver()
        })
    })


    // @ts-ignore
    const ingredientCard = items.map((item:IItem, index:number, moveListItem:() => void) => {
        return(
            <Ingridient item={item} index={index} moveListItem={moveListItem} key={item.uid}/>
        )
    })

    const totalItemsPrice = useMemo(() => {
        let sum = 0;
        if(items || bun) {
            if(bun) {
                sum += bun.price * 2
            }
            if(items) {
                items.map((item: { price: number; }) => sum += item.price)
            }
            return sum
        }
    }, [bun,items])

    const setOrder = () => {
        if(localStorage.refreshToken) {
            // @ts-ignore
            if(items.length > 0 && bun) {
                // @ts-ignore
                const order = [bun._id, ...items.map((item: { _id: any; }) => item._id), bun._id]
                dispatch(loadOrder(order))
            }else{
                alert('Заправь свой Генедар, иначе воткнешься в Дренор так что обязательно булку добавь ну и соусов там накидай и ингридиентов всяких')
            }
        } else {
            history.push('/login')
        }

    }

  return (
  
    <div className={styles.constructorWrapper} ref={dropRef}>
      <div className={styles.constructorBlock}>
          {bun && <Bun bun={bun} pos="top"/>}

        <div className={styles.constructorIngridientWrapper} ref={dropItemRef}>
          {ingredientCard}
        </div>
          {bun && <Bun bun={bun} pos="bottom" /> }
      </div>
      <div className = {styles.constructorPriceFooter}>
          <div className = {styles.totalPriceText} >
              <p className={styles.totalPriceTextP } >
                  {totalItemsPrice}
              </p>
              <CurrencyIcon type="primary" />
          </div>
          
           <Button type="primary" size="large"  onClick={setOrder}>
                Заказать
           </Button>
      </div>

    </div>

  )
 }


export default BurgerConstructor;

