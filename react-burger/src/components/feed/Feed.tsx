import {useAppSelector} from "../../services/hook";
import React, {FC, useMemo} from "react";
import {TOrder} from '../../services/types';
import styles from './Feed.module.css';


const Feed:FC = () => {
    const data = useAppSelector(state => state.wsData.data);

    return (
        <>
            <div className={styles.status}>
                <div className={styles.status_item}>
                    <p className="text text_type_main-medium mb-4">Готовы:</p>
                    <ul className={styles.list}>
                        {data.orders.filter((item: {
                            status: string;
                            type: TOrder; }) => item.status.match("done")).slice(0,5).map(
                           (item: object)=>{
                              const {number}:any = {...item};
                                return (
                                  <li className="text text_type_digits-default mt-2" key={number}>{number}</li>
                                )
                           }
                        )}
                    </ul>
                </div>
                <div className={styles.status_item}>
                    <p className="text text_type_main-medium">В работе:</p>
                    <ul className={styles.list}>
                        {data.orders.filter((item: {
                            status: string;
                            type: TOrder; }) => item.status.match("pending")).slice(0,5).map(
                            (item: object)=>{
                                const {number}:any = {...item};
                                return (
                                    <li className="text text_type_digits-default mt-2" key={number}>{number}</li>
                                )
                            }
                        )}
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