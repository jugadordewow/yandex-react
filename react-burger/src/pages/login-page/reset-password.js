import {Link, useHistory } from "react-router-dom";
import {useState, useRef } from 'react';
import { useDispatch, useSelector} from "react-redux";
import {resetPaswd} from "../../services/actions/auth";
import {EmailInput, PasswordInput, Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css'

const ResetPassword = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const inputRef = useRef(null);

    const [form, setForm] = useState({ token: '', password: '' });
    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
    }
    if ((typeof history.location.state == "undefined") || (!history.location.state.reset)) { history.push('/forgot-password')};

    const redirect = () => {
        history.push('/')
    };

    const reset = e => {
        e.preventDefault();
        dispatch(resetPaswd(form, redirect));
    };

    if (localStorage.refreshToken) { redirect() };

    return (
        <div className={styles.formWrapper}>
            <form className={styles.loginForm} onSubmit={reset}>
                <h2 className={styles.formHeader}>Восстановление пароля</h2>
                <div className={styles.formField}>
                    <PasswordInput name={'password'} />
                </div>
                <div className={styles.formField}>
                    <Input  name={'email'}
                            placeholder={'Введите код из письма'}
                            onChange={onChange}
                            icon={'CurrencyIcon'}
                            value={form.token}
                            name="token"
                            error={false}
                            ref={inputRef}
                            onIconClick={onIconClick}
                            errorText={'Ошибка'}
                            size={'default'}
                    />
                </div>
                <div className={styles.formField}>
                    <Button type="primary" size="medium">
                        Сохранить
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

export default ResetPassword;