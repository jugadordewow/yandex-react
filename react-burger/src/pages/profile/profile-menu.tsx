import styles from "./profile.module.css";
import {NavLink, useHistory} from "react-router-dom";
import React, {FC, SyntheticEvent} from "react";
import {logout} from "../../services/actions/auth";
import {useAppDispatch} from "../../services/hook";
import {deleteCookie} from "../../utils/cookie";


const ProfileMenu:FC = () => {

    const history = useHistory<string>()
    const dispatch = useAppDispatch()

    const redirect = () => {
        history.push('/login')
    };

    const userLogout = (e:SyntheticEvent) => {
        e.preventDefault();
        deleteCookie('token');
        dispatch(logout(redirect()));

    };
    return (
        <ul>
            <li className={styles.menu_item + ' text text_type_main-medium'}>
                <NavLink className={styles.link + ' text_color_inactive'}
                         to="/profile"
                         activeClassName={styles.active_link}
                >
                    Профиль
                </NavLink>
            </li>
            <li className={styles.menu_item + ' text text_type_main-medium'}>
                <NavLink to="/profile/orders"
                         className={styles.link + ' text_color_inactive'}
                         activeClassName={styles.active_link}
                >
                    История заказов
                </NavLink>
            </li>
            <li className={styles.menu_item + ' text text_type_main-medium'}   onClick={userLogout}>
                            <span className={styles.link + ' text_color_inactive'}>
                                Выйти
                            </span>
            </li>
        </ul>
    )
}
export default ProfileMenu;