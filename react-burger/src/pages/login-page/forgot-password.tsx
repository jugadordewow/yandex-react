import React, {ChangeEvent, SyntheticEvent, useState} from "react";
import { useHistory, Link } from 'react-router-dom';
import { forgotPswd } from "../../services/actions/auth";
import {authActions} from "../../services/actions/auth";
import { Input} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css'
import {useAppDispatch} from "../../services/hook";
import {Button} from "../../services/uiTypes";

const ForgotPassword:React.FC = () => {

    const history = useHistory<{}>();
    const dispatch = useAppDispatch();
    const [form, setForm] = useState<{email: string}>({ email: '' });
    const onChange = (e:ChangeEvent<{name: string, value:string}>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const redirect = () => {
        history.push('/reset-password', {reset:true})
    };

    const forgotPass = (e:SyntheticEvent) => {
        e.preventDefault();
        dispatch(authActions.forgotPswdRequest(), forgotPswd(form,redirect));
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