import {Link, Redirect} from "react-router-dom";
import {useState} from 'react';
import { useDispatch, useSelector} from "react-redux";
import { login } from "../../services/actions/auth";
import {EmailInput, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css'

const Login = () => {

    const dispatch = useDispatch()

    const [form, setForm] = useState({email: '', password: ''})

    const onChange = e => {
        setForm({...form, [e.target.name] : e.target.value})
    }

    const {logout} = useSelector(state => state.auth)

    const userAuth = e => {
        e.preventDefault();
        dispatch(login(form))
    }

    return(
        <div>
        {(localStorage.refreshToken && !logout) ? (<Redirect to='/' />) : (
        <div className={styles.formWrapper}>
            <form className={styles.loginForm} onSubmit={userAuth}>
                <h2 className={styles.formHeader}>Вход</h2>
                <div className={styles.formField}>
                    <EmailInput  name={'email'} onChange={onChange} value={form.email}/>
                </div>
                <div className={styles.formField}>
                    <PasswordInput name={'password'} onChange={onChange} value={form.password}/>
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
        )}
        </div>
    )
}

export default Login