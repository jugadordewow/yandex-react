import styles from './Feed.module.css';
import {useLocation, Link} from "react-router-dom";
import {FC} from "react";
import {ILocation, TOrder} from "../../services/types";
import {getOrderDate} from "../../utils/order-dates";
import {useAppSelector} from "../../services/hook";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

type TFeed = {
    order: TOrder;
}

const FeedItem: FC<TFeed> = ({order}) => {

    const location = useLocation<ILocation>();
    const path = (location.pathname === '/feed') ? `/feed/${order.number}`: `/profile/orders/${order.number}`;
    const orderDate = getOrderDate(order);
    const ingridients = useAppSelector(state => state.ingredients.items);

    const status : {name:string, style:string} = (order && (order.status === 'done')) ? {name:'Выполнен', style:'done'}
        : (order && (order.status === 'pending')) ? {name:'Создан', style:'pending'}
            : (order && (order.status === 'created')) ? {name:'Готовится', style:'created'}
                : { name: 'Отменён', style:'cancel' };

    let price = 0;

    return (
       <>
        <Link className={styles.link} to={{ pathname: path, state: { background: location } }} >
            <div className={styles.item}>
                <div className={styles.header}>
                    <p className="text text_type_digits-default">#{order.number}</p>
                    <p className="text text_type_main-default text_color_inactive">{orderDate}</p>
                </div>
                <h2 className="text text_type_main-medium mt-6">{order.name}</h2>
                {(location.pathname === '/profile/orders') && (<p className="mt-2">{status.name}</p>)}
                <div className={styles.footer + ' mt-6'}>
                    <div className={styles.img_container}>
                        {order.ingredients.map((item : string, index : number) => {
                            const zIndex = 6 - index;
                            const ingredient = (ingridients != null) && ingridients.find((itemI) => itemI._id === item);
                            if (ingredient) {
                                price += ingredient.price;
                                const image = ingredient.image_large;
                                if (zIndex > 0) {
                                    return (
                                        <div className={styles.img_item}  key={index}>
                                            <img src={image} alt={ingredient.name}/>
                                        </div>
                                    );
                                }
                                if (zIndex === 0) {
                                    return (
                                        <div className={styles.img_item_col} style={{ zIndex : 0 }} key={index}>
                                            <div className={styles.img_item_cola}>
                                                <img src={image} alt={ingredient.name}/>
                                            </div>
                                            <span className={styles.col + " text text_type_main-default"}>{`+${order.ingredients.length - 6}`}</span>
                                        </div>
                                    );
                                }
                            }
                        })}
                    </div>
                    <div className={styles.price}>
                        <span className="text text_type_digits-default mr-2">{price}</span>
                        <CurrencyIcon type='primary' />
                    </div>
                </div>
            </div>
        </Link>
</>
    )
}

export default FeedItem;