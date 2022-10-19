import {Link, Redirect} from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import {EmailInput, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css'

const Registration = () => {
    return(
        <div className={styles.formWrapper}>
            <form className={styles.loginForm}>
                <h2 className={styles.formHeader}>Вход</h2>
                <div className={styles.formField}>
                    <EmailInput  name={'email'} />
                </div>
                <div className={styles.formField}>
                    <PasswordInput name={'password'} />
                </div>
                <div className={styles.formField}>
                    <Button type="primary" size="medium">
                        Войти
                    </Button>
                </div>
            </form>
            <div className={styles.mt20 + " text text_type_main-small text_color_inactive"} >
                Вы — новый пользователь?
                <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
            </div>
            <div className={styles.mt4 + " text text_type_main-small text_color_inactive"}>
                Забыли пароль?
                <Link to="/reset-password" className={styles.link}>Восстановить пароль</Link>
            </div>
        </div>
    )
}

export default Registration