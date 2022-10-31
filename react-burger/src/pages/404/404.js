import styles from './styles.module.css'
import {Link, Redirect} from "react-router-dom";

const Page404 = () => {
    return (
        <div className={styles.wrapper}>
            <span className={styles.notFound}>404</span>
            <span className={styles.text}>
                Вернуться
                <Link to="/" className={styles.link} activeClassName={styles.activeLink}>на главную</Link>
            </span>
        </div>
    )
}

export default Page404;