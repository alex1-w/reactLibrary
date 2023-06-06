import styles from '../../elements/LogIn/LogIn.module.scss'
import { ChangeEvent, useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion'
import { useSnackbar } from 'notistack';
import { IUser } from '../../../types/IBookItem';
import { IFormState } from '../../../types/IFormState';

let usersArray: IUser[] = []

export const SignIn = () => {
    const { enqueueSnackbar } = useSnackbar();

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => setFormState({ ...formState, [e.target.name]: e.target.value })

    const [formState, setFormState] = useState<IFormState>({
        name: '',
        password: '',
        repeatPassword: ''
    })

    const signIn = () => {

        if (!formState.name.length) return enqueueSnackbar('заполните пустое поле', { variant: 'warning' });
        if (!formState.password.length) return enqueueSnackbar('заполните пустое поле', { variant: 'warning' });
        if (formState.password.length < 6) return enqueueSnackbar('пароль должен быть больше 6-ти символов', { variant: 'warning' });
        if (formState.repeatPassword !== formState.password) return enqueueSnackbar('Пароли не совпадают', { variant: 'error' });

        const usersInLS = JSON.parse(localStorage.getItem('users') ?? '[]')
        const isNameInLS = usersInLS.find((item: IUser) => item.name === formState.name)

        if (isNameInLS) return enqueueSnackbar('такое имя уже занято', { variant: 'error' });

        const userBody =
        {
            name: formState.name,
            password: formState.password,
            id: Date.now(),
            cash: 0,
            favorites: [],
            cart: [],
        }

        usersArray.push(userBody)        
        localStorage.setItem('users', JSON.stringify(usersArray))
        setFormState({
            name: '',
            password: '',
            repeatPassword: ''
        })
        enqueueSnackbar('Вы аторизовались', { variant: 'success' });
    }

    return (
        <AnimatePresence>

            <div className={styles.inputBlock}>

                <input type="text" onChange={changeHandler} value={formState.name} name='name' placeholder='name' />
                <input type="password" onChange={changeHandler} value={formState.password} name='password' placeholder='password' />
                <input type="password" onChange={changeHandler} value={formState.repeatPassword} name='repeatPassword' placeholder='repeat password'/>

                <button className={styles.enterBtn} onClick={signIn}>ENTER</button>

            </div>

        </AnimatePresence>
    )
}