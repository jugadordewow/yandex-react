import {FC} from "react";
import {useParams} from "react-router-dom";
import {useAppSelector} from "../../services/hook";
import {TOrder} from "../../services/types";
import {getOrderDate} from "../../utils/order-dates";
import styles from './Feed.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

type TFeedDetails = {
    isAuthorized: boolean;
}

const FeedDetails:FC<TFeedDetails> = ({isAuthorized}) => {

    const id = useParams();
    const orders =  useAppSelector(state => (isAuthorized) ? state.wsUserData.data : state.wsData.data)
    const ingridients = useAppSelector(state => state.ingredients.items)

    // @ts-ignore
    let order = (orders.length > 0) && orders.find((item:TOrder) => item.number == id);
    const date = (order) ? getOrderDate(order) : null;
    const status : {name:string, style:string} = (order && (order.status === 'done')) ? {name:'Выполнен', style:'done'}
        : (order && (order.status === 'pending')) ? {name:'Создан', style:'pending'}
            : (order && (order.status === 'created')) ? {name:'Готовится', style:'created'}
                : { name: 'Отменён', style:'cancel' };

    const orderUnical = order && order.ingredients.map((order:object) => order)
    let counts:any = [];

    const filterCache = orderUnical && orderUnical.filter((i:string,id:number)=> orderUnical.indexOf(i) === id)

    orderUnical && orderUnical.forEach(function(x:number) { counts[x] = (counts[x] || 0)+1; });

    let sum = 0;

    let summ =  orderUnical && orderUnical.map((item:any)=>  {
        (ingridients != null) && ingridients.map((i: any) => i === item.id)
    })

    return (
        <>
            {order && (
                <div className={styles.container}>
                    <p className={styles.center + " text text_type_digits-default mt-6"}>
                        id
                    </p>

                    <p className="text text_type_main-medium mt-10">{order.name}</p>
                    <p className={`text text_type_main-default mt-10 ${status.style}`}>{status.name}</p>
                    <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
                    <ul className={styles.list}>
                        { filterCache && filterCache.map((id : string, index : number) => {

                            let ingredient = (ingridients != null) && ingridients.find((item) => item._id === id);

                            if (ingredient) {
                                const price = ingredient.price;
                                const image = ingredient.image_large;
                                const name = ingredient.name;
                                sum += counts[ingredient._id]*price
                                return (
                                    <li className={styles.list_item + ' mb-4'} key={index}>
                                        <div className={styles.about}>
                                            <div className={styles.img_item} style={{zIndex: 6}}>
                                                <img src={image} alt={name}/>
                                            </div>
                                            <p className="text text_type_main-default ml-4">{name}</p>
                                        </div>
                                        <div className={styles.price}>
                                            <span className="text text_type_digits-default mr-2">{counts[ingredient._id]} x {counts[ingredient._id]>1? counts[ingredient._id]*price:price}</span>
                                            <CurrencyIcon type='primary'/>
                                        </div>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                    <div className={styles.footer + ' mt-10'}>
                        <p className="text text_type_main-default text_color_inactive">{date}</p>
                        <p className={styles.price}>
                            <span className="text text_type_digits-default mr-2">{sum}</span>
                            <CurrencyIcon type='primary' />
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}

export default FeedDetails;