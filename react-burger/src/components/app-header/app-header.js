import { render } from "@testing-library/react";
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './header.module.css';


const AppHeader = (props) => {
    return (
        <header>
            <div className={style.header}>
                <nav className={style.topNavItems}>
                    <a className={style.topNavItemLink} >
                        <BurgerIcon type="primary" />
                        <span className={style.navItemText + " text text_type_main-default"}>Конструктор</span>
                    </a>
                    <a className={style.topNavItemLink} >
                        <ListIcon type="secondary" />
                        <span className={style.navItemText + " text text_type_main-default text_color_inactive"}>Лента заказов</span>
                    </a>
                </nav>
                <Logo />
                <a className={style.btnEntry} > 
                    <ProfileIcon type="secondary" />
                    <span className={style.btnEntryText + " text text_type_main-default text_color_inactive"}>Личный кабинет</span>
                </a>
            </div>
        </header>
    );
}

export default AppHeader;