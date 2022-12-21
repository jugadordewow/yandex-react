import React, {useState, useRef, useEffect, SyntheticEvent} from 'react';
import {useHistory} from 'react-router-dom';
import { getAuth, updateAuth} from "../../services/actions/auth";
import styles from './profile.module.css';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import {useAppDispatch, useAppSelector} from "../../services/hook";
import ProfileMenu from "./profile-menu";
import {getCookie} from "../../utils/cookie";
import  { Button }  from '../../services/uiTypes';

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

    console.log(getCookie('token'))
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
        dispatch(updateAuth);
    }


    useEffect(
        () => {

            dispatch(getAuth);
        },
        []
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
                <div className={styles.profileWrapper + ' pt-20'}>
                    <section className={styles.menu + ' mr-15'}>
                        <ProfileMenu />
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
                                <Button type="primary" htmlType="submit" size="medium">
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
