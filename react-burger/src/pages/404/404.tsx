import styles from './styles.module.css'
import {Link, Redirect, NavLink} from "react-router-dom";

const Page404 = () => {
    return (
        <div className={styles.wrapper}>
            <span className={styles.notFound}>404</span>
            <span className={styles.text}>
                Вернуться
                <NavLink to="/" className={styles.link} activeClassName={styles.activeLink}>на главную</NavLink>
            </span>
        </div>
    )
}

export default Page404;