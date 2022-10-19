import {Link, Redirect} from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import {EmailInput, PasswordInput, Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css'

const ForgotPassword = () => {
    return (
        <div className={styles.formWrapper}>
            <form className={styles.loginForm}>
                <h2 className={styles.formHeader}>Вход</h2>
                <div className={styles.formField}>
                    <Input  name={'email'} placeholder={'Укажите E-mail'}/>
                </div>
                <div className={styles.formField}>
                    <Button type="primary" size="medium">
                        Восстановить
                    </Button>
                </div>
            </form>
            <div className={styles.mt20 + " text text_type_main-small text_color_inactive"} >
                Вспомнили пароль?
                <Link to="/login" className={styles.link}>Войти</Link>
            </div>
        </div>
    )
}

export default ForgotPassword;