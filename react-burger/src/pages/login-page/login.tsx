import {Link, Redirect} from "react-router-dom";
import React, {SyntheticEvent, useState} from 'react';
import { useDispatch, useSelector} from "react-redux";
import { login } from "../../services/actions/auth";
import {EmailInput, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css'
import {useAppDispatch, useAppSelector} from "../../services/hook";

interface IProfile {
    auth: {
        name:string,
        email:string,
        loginRequest: boolean,
        loginFailed: boolean,
        logoutRequest: boolean,
        logoutFailed: boolean,
        forgotPswdRequest: boolean,
        forgotPswdFailed: boolean,
        resetPswdRequest: boolean,
        resetPswdFailed: boolean,
        authRequest: boolean,
        authFailed: boolean,
        tokenRequest: boolean,
        tokenFailed: boolean,
        registerRequest: boolean,
        registerFailed:boolean
    }
}

const Login:React.FC = () => {

    const dispatch = useAppDispatch()

    const [form, setForm] = useState<any>({email: '', password: ''})

    const onChange = (e:{target: HTMLInputElement}) => {
        setForm({...form, [e.target.name] : e.target.value})
    }

    const {logoutRequest} = useAppSelector(state => state.auth)

    const userAuth = (e:SyntheticEvent) => {
        e.preventDefault();
        // @ts-ignore
        dispatch(login(form))
    }

    return(
        <>
        {(localStorage.refreshToken && !logoutRequest) ? (<Redirect to='/' />) : (
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
        </>
    )
}

export default Login