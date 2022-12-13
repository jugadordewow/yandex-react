import {useAppDispatch, useAppSelector} from "../../services/hook";
import {FC, useEffect} from "react";
import {wsActions} from "../../services/actions/wsActions";
import Feed from "../../components/feed/Feed";
import FeedItem from "../../components/feed/FeedItem";
import styles from "./feed.module.css";
import {TOrder} from "../../services/types";

export const FeedPage:FC = () => {

    const dispatch = useAppDispatch();
    const ordersList = useAppSelector(state => state.wsData.data.orders);

    useEffect(() => {
        dispatch(wsActions.wsInit());
        return () => {
            dispatch(wsActions.onClosed())
        }
    }, [dispatch]);

    return (
        <div>
            <main>
                <h1 className="text text_type_main-large">Лента заказов</h1>
                <div className={styles.container + ' mt-5'}>
                    <section className={styles.item}>
                        {ordersList && ordersList.map((order : TOrder) => <FeedItem key={order._id} order={order} />)}
                    </section>
                    <section className={styles.item}>
                        <Feed/>
                    </section>
                </div>
            </main>
        </div>
    )
}