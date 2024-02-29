import { useForm } from 'react-hook-form'
import styles from './app.module.css'

const sendFormData = (formData) => {
	console.log(formData)
}

export const App = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: '',
		},
	})

	const emailError = errors.email?.message
	const passwordError = errors.password?.message
	const repeatPasswordError = errors.repeatPassword?.message

	const emailProps = {
		pattern: {
			value: /^[\w]*@[a-z]*\.[a-z]{2,3}$/,
			message:
				'Некорректно введен адрес электронной почты, должен быть example@example.ru',
		},
	}

	const passwordProps = {
		maxLength: {
			value: 6,
			message: 'Неверный пароль. Должно быть не больше 6 символов',
		},
		minLength: {
			value: 3,
			message: 'Неверный пароль. Должно быть не меньше 3 символов',
		},
	}

	const repeatPasswordProps = {
		validate: {
			value: (value, formValues) => {
				if (value !== formValues.password) {
					return 'Пароль не совпадает'
				}
			},
		},
	}

	return (
		<div className={styles.app}>
			<div className={styles.login}>LOGIN</div>
			<form className={styles.item} onSubmit={handleSubmit(sendFormData)}>
				{emailError && <div className={styles.error}>{emailError}</div>}
				<input
					disabled={!!emailError || !!passwordError || !!repeatPasswordError}
					{...register('email', emailProps)}
					className={styles.input}
					type="text"
					name="email"
					placeholder="e-mail"
				/>
				{passwordError && <div className={styles.error}>{passwordError}</div>}
				<input
					{...register('password', passwordProps)}
					className={styles.input}
					type="password"
					name="password"
					placeholder="password"
				/>
				{repeatPasswordError && (
					<div className={styles.error}>{repeatPasswordError}</div>
				)}
				<input
					{...register('repeatPassword', repeatPasswordProps)}
					disabled={!!emailError || !!passwordError || !!repeatPasswordError}
					className={styles.input}
					type="password"
					name="repeatPassword"
					placeholder="repeatPassword"
				/>
				<button
					type="submit"
					className={styles.btn1}
					disabled={
						!!emailError || !!passwordError || !!repeatPasswordError || errors
					}
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
