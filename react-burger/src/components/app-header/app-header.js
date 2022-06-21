import { render } from "@testing-library/react";
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './styles.css';


const AppHeader = (props) => {
    return (
        <header>
            <div className="header-wrapper">
                <nav className="top-nav-items">
                    <a className="top-nav-item-link" href >
                        <BurgerIcon type="primary" />
                        <span className="nav-item-text text text_type_main-default" href="/">Конструктор</span>
                    </a>
                    <a className="top-nav-item-link" href>
                        <ListIcon type="secondary" />
                        <span className="nav-item-text text text_type_main-default text_color_inactive" href="/">Лента заказов</span>
                    </a>
                </nav>
                <Logo />
                <a className="btn-entry" href> 
                    <ProfileIcon type="secondary" />
                    <span className="btn-entry-text text text_type_main-default text_color_inactive">Личный кабинет</span>
                </a>
            </div>
        </header>
    );
}

export default AppHeader;