import { render } from "@testing-library/react";
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './header.module.css';
import {
    NavLink,
    Link,
    useLocation
} from 'react-router-dom';
import {FC} from "react";


const AppHeader:FC = () => {
    return (
        <header>
            <div className={style.header}>
                <nav className={style.topNavItems}>
                    <NavLink to="/" className={style.topNavItemLink} >
                        <BurgerIcon type="primary" />
                        <span className={style.navItemText + " text text_type_main-default"}>Конструктор</span>
                    </NavLink>
                    <NavLink to="/feed" className={style.topNavItemLink} >
                        <ListIcon type="secondary" />
                        <span className={style.navItemText + " text text_type_main-default text_color_inactive"}>Лента заказов</span>
                    </NavLink>
                </nav>
                <NavLink to="/">
                    <Logo />
                </NavLink>
                <NavLink to="/profile" className={style.btnEntry} >
                    <ProfileIcon type="secondary" />
                    <span className={style.btnEntryText + " text text_type_main-default text_color_inactive"}>Личный кабинет</span>
                </NavLink>
            </div>
        </header>
    );
}

export default AppHeader;