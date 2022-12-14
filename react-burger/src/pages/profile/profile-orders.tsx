import {useAppDispatch, useAppSelector} from "../../services/hook";
import {FC, useEffect} from "react";
import {wsUserActions} from "../../services/actions/wsUserActions";
import FeedItem from "../../components/feed/FeedItem";
import {TOrder} from "../../services/types";
import styles from './profile.module.css';

export const ProfilePageOrders:FC = () => {

    console.log('121')

    const orders = useAppSelector(state => state.wsUserData.data.orders)
    const dispatch = useAppDispatch()

    useEffect(() => {
        //dispatch(wsUserActions.wsInit);
        return () => {
            dispatch(wsUserActions.onClosed)
        }
    }, []);

  return(
      <div>
          <main>
              <div className={styles.conteiner + ' pt-20'}>
                  <section className={styles.menu + ' mr-15'}>
                      <p className={styles.text + ' text text_type_main-default text_color_inactive mt-20'}>В этом разделе вы можете просмотреть свою историю заказов</p>
                  </section>
                  <section className={styles.orders}>
                      {orders && orders.map((order : TOrder) => <FeedItem key={order._id} order={order} />)}
                  </section>
              </div>
          </main>
      </div>
  )
}