import React, {useState} from "react";
import { useHistory, Link } from 'react-router-dom';
import { forgotPswd } from "../../services/actions/auth";
import { useDispatch, useSelector} from "react-redux";
import {EmailInput, PasswordInput, Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css'

const ForgotPassword:React.FC = () => {

    const history = useHistory<any>();
    const dispatch = useDispatch<any>();
    const [form, setForm] = useState<any>({ email: '' });
    const onChange = (e:any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const redirect = () => {
        history.push('/reset-password', {reset:true})
    };

    const forgotPass = (e:any) => {
        e.preventDefault();
        dispatch(forgotPswd(form, redirect));
    };

    if (localStorage.refreshToken) history.push('/');


    return (
        <div className={styles.formWrapper}>
            <form className={styles.loginForm} onSubmit={forgotPass}>
                <h2 className={styles.formHeader}>Вход</h2>
                <div className={styles.formField}>
                    <Input
                            placeholder={'Укажите E-mail'}
                            onChange={onChange}
                            value={form.email}
                            name="email"
                    />
                </div>
                <div className={styles.formField}>
                    <Button type="primary" size="medium" >
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