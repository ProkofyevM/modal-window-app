import { set, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import styles from './app.module.css'

const sendFormData = (formData) => {
	console.log(formData)
}


export const App = () => {
	const schema = yup.object().shape({
		email: yup
			.string()
			.matches(
				/^[\w]*@[a-z]*\.[a-z]{2,3}$/,
				'Некорректно введен адрес электронной почты, должен быть example@example.ru',
			),
		password: yup
			.string()
			.max(6, 'Неверный пароль. Должно быть не больше 6 символов')
			.min(3, 'Неверный пароль. Должно быть не меньше 3 символов'),
		repeatPassword: yup
			.string()
			.test(
				'isRepeatPassword',
				'Пароль не совпадает',
				(value) => value === getValues('password'),
			),
	})

	const {
		register,
		reset,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: '',
		},
		resolver: yupResolver(schema),
	})

	const emailError = errors.email?.message
	const passwordError = errors.password?.message
	const repeatPasswordError = errors.repeatPassword?.message

	return (
		<div className={styles.app}>
			<div className={styles.login}>LOGIN</div>
			<form className={styles.item} onSubmit={handleSubmit(sendFormData)}>
				{emailError && <div className={styles.error}>{emailError}</div>}
				<input
					disabled={!!emailError || !!passwordError || !!repeatPasswordError}
					{...register('email')}
					className={styles.input}
					type="text"
					name="email"
					placeholder="e-mail"
				/>
				{passwordError && <div className={styles.error}>{passwordError}</div>}
				<input
					{...register('password')}
					className={styles.input}
					type="password"
					name="password"
					placeholder="password"
				/>
				{repeatPasswordError && (
					<div className={styles.error}>{repeatPasswordError}</div>
				)}
				<input
					{...register('repeatPassword')}
					disabled={!!emailError || !!passwordError || !!repeatPasswordError}
					className={styles.input}
					type="password"
					name="repeatPassword"
					placeholder="repeatPassword"
				/>
				<button
					type="submit"
					className={styles.btn1}
					disabled={!!emailError || !!passwordError || !!repeatPasswordError}
				>
					Зарегестрироваться
				</button>
				<button type="button" className={styles.btn2} onClick={() => reset()}>
					Перезапустить
				</button>
			</form>
		</div>
	)
}
