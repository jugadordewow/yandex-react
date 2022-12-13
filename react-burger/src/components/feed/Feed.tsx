import {useAppSelector} from "../../services/hook";
import {FC, useMemo} from "react";
import {TOrder} from '../../services/types';
import styles from './Feed.module.css';

const Feed:FC = () => {
    const data = useAppSelector(state => state.wsData.data);

    const orders: { created: Array<string>, pending: Array<string>, done: Array<string> } = useMemo(() => {
        let orders: { created: Array<string>, pending: Array<string>, done: Array<string> } = {
            created: [],
            pending: [],
            done: []
        };
        data.orders.map((order: TOrder) => {
            if (order.status === 'created') orders.created = [...orders.created, order.number];
            if (order.status === 'pending') orders.pending = [...orders.pending, order.number];
            if (order.status === 'done') orders.done = [...orders.done, order.number];
        })
        return orders;
    }, [data.orders]);

    return (
        <>
            <div className={styles.status}>
                <div className={styles.status_item}>
                    <p className="text text_type_main-medium mb-4">Готовы:</p>
                    <ul className={styles.list}>
                        { orders.pending.map((order : string, index : number) => {
                            return (
                                <li className="text text_type_digits-default mt-2" key={index}>{order}</li>
                            )}
                        )}
                    </ul>
                </div>
                <div className={styles.status_item}>
                    <p className="text text_type_main-medium">В работе:</p>
                    <ul className={styles.list}>
                        { orders.created.map((order : string, index : number) => (
                            <li className="text text_type_digits-default mt-2" key={index}>{order}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <p className="text text_type_main-medium mt-15">Выполнено за все время:</p>
            <p className={styles.ts + " text text_type_digits-large"}>{data.common}</p>
            <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
            <p className={styles.ts + " text text_type_digits-large"}>{data.commonToday}</p>
        </>
    )
}

export default Feed;