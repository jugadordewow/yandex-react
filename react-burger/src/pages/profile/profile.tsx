import React, {useState, useRef, useEffect, SyntheticEvent} from 'react';
import {useHistory, Link, NavLink} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, getAuth, updateAuth} from "../../services/actions/auth";
import styles from './profile.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
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

const ProfilePage:React.FC = () => {

    const history = useHistory();
    const inputRef:any = useRef<HTMLInputElement | null>(null);
    const dispatch = useAppDispatch();
    const { name, email } = useAppSelector(
        state => state.auth
    );


    const [form, setForm] = useState({ name:name, email:email, password: '' });
    const onChange = (e:{target: HTMLInputElement}) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
    }
    const cancel = (e:SyntheticEvent) => {
        e.preventDefault();
        setForm({ name:name, email:email, password: '' });
    }
    const save = (e:SyntheticEvent) => {
        e.preventDefault();
        // @ts-ignore
        dispatch(updateAuth(form));
    }

    const redirect = () => {
        history.push('/login')
    };

    const userLogout = (e:SyntheticEvent) => {
        e.preventDefault();
        // @ts-ignore
        dispatch(logout(redirect(), true, ''));
    };

    useEffect(
        () => {
            // @ts-ignore
            dispatch(getAuth());
        },
        [dispatch]
    );

    useEffect(
        () => {
            setForm({ name:name, email:email, password: '' });
        },
        [name, email]
    );

    return (
        <>
            <main>
                <div className={styles.container + ' pt-20'}>
                    <section className={styles.menu + ' mr-15'}>
                        <ul>
                        <li className={styles.menu_item + ' text text_type_main-medium'}>
                            <NavLink className={styles.link + ' text_color_inactive'}
                                     to="/profile"
                                     activeClassName={styles.active_link}
                            >
                                Профиль
                            </NavLink>
                        </li>
                        <li className={styles.menu_item + ' text text_type_main-medium'}>
                            <NavLink to="/profile/orders"
                                     className={styles.link + ' text_color_inactive'}
                                     activeClassName={styles.active_link}
                            >
                                История заказов
                            </NavLink>
                        </li>
                        <li className={styles.menu_item + ' text text_type_main-medium'}   onClick={userLogout}>
                            <span className={styles.link + ' text_color_inactive'}>
                                Выйти
                            </span>
                        </li>
                        </ul>
                        <p className={styles.text + ' text text_type_main-default text_color_inactive mt-20'}>В этом разделе вы можете изменить свои персональные данные</p>
                    </section>
                    <section className={styles.about}>
                        <form onSubmit={save} >
                            <div className="mt-6">
                                <Input type={'text'}
                                       placeholder={'Имя'}
                                       onChange={onChange}
                                       icon={'CurrencyIcon'}
                                       value={form.name}
                                       name="name" error={false}
                                       ref={inputRef}
                                       onIconClick={onIconClick}
                                       errorText={'Ошибка'}
                                       size={'default'} />
                            </div>
                            <div className="mt-6">
                                <EmailInput onChange={onChange}
                                            value={form.email}
                                            name="email" />
                            </div>
                            <div className="mt-6">
                                <PasswordInput
                                    onChange={onChange}
                                    value={form.password}
                                    name={'password'} />
                            </div>
                            <div className={styles.buttons + ' mt-6'}>
                                <button className={styles.cancel + ' text text_type_main-default pl-2 pr-2 mr-5'}
                                        onClick={cancel}>
                                    Отмена
                                </button>
                                <Button type="primary" size="medium">
                                    Сохранить
                                </Button>
                            </div>
                        </form>
                    </section>
                </div>
            </main>
        </>
    );
}

export default ProfilePage
