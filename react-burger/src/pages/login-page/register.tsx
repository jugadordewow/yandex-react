import {Link, useHistory} from "react-router-dom";
import {useState, useRef} from 'react';
import { useDispatch, useSelector} from "react-redux";
import {userRegister} from "../../services/actions/auth";
import {EmailInput, PasswordInput, Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './styles.module.css'

const Registration = () => {

    const inputRef = useRef(null);
    const history = useHistory();
    const dispatch = useDispatch();

    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
    }

    const redirect = () => {
        history.push('/')
    };

    const register = e => {
        e.preventDefault();
        dispatch(userRegister(form, redirect));
    };

    if (localStorage.refreshToken) redirect();

    return(
        <div className={styles.formWrapper}>
            <form className={styles.loginForm} onSubmit={register}>
                <h2 className={styles.formHeader}>Регистрация</h2>
                <div className={styles.formField}>
                    <Input  type={'text'}
                            placeholder={'Имя'}
                            onChange={onChange}
                            icon={'CurrencyIcon'}
                            value={form.name} name="name"
                            error={false}
                            ref={inputRef}
                            onIconClick={onIconClick}
                            errorText={'Ошибка'}
                            size={'default'}
                    />
                </div>
                <div className={styles.formField}>
                    <EmailInput  name={'email'}
                                 onChange={onChange}
                                 value={form.email}
                    />
                </div>
                <div className={styles.formField}>
                    <PasswordInput name={'password'}
                                   onChange={onChange}
                                   value={form.password}
                    />
                </div>
                <div className={styles.formField}>
                    <Button type="primary" size="medium">
                        Регистрация
                    </Button>
                </div>
            </form>
            <div className={styles.mt20 + " text text_type_main-small text_color_inactive"} >
                Уже зарегистрированы?
                <Link to="/login" className={styles.link}>Войти</Link>
            </div>
        </div>
    )
}

export default Registration