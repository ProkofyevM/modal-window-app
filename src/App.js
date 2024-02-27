import { useState } from 'react'
import styles from './app.module.css'

const sendData = (form) => {
	console.log(form)
}

const initialState = {
	email: '',
	password: '',
	repeatPassword: '',
}

const useStore = () => {
	const [state, setState] = useState(initialState)

	return {
		getState: () => state,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue })
		},
		resetState: () => {
			setState(initialState)
		},
	}
}

export const App = () => {
	const { getState, updateState, resetState } = useStore()
	const [newError, setNewError] = useState(null)

	const onSubmit = (event) => {
		event.preventDefault()
		sendData(getState())
	}

	const resetError = () => {
		resetState()
		setNewError(null)
	}

	const { email, password, repeatPassword } = getState()

	const onChange = ({ target }) => {
		updateState(target.name, target.value)
	}

	const onBlur = () => {
		if (email && !/^[\w]*@[a-z]*\.[a-z]{2,3}$/.test(email)) {
			setNewError('Некорректно введен адрес электронной почты')
		} else if (password.length > 6) {
			setNewError('Превышено число символов. Максимальное 6')
		} else if (repeatPassword && password !== repeatPassword) {
			setNewError('Пароль не соответствует')
		}
	}

	return (
		<div className={styles.app}>
			<form className={styles.item} onSubmit={onSubmit}>
				{newError && <div className={styles.error}>{newError}</div>}
				<input
					type="email"
					name="email"
					value={email}
					placeholder="e-mail"
					onChange={onChange}
					onBlur={onBlur}
				/>
				<input
					type="password"
					name="password"
					value={password}
					placeholder="password"
					onChange={onChange}
					onBlur={onBlur}
				/>
				<input
					type="password"
					name="repeatPassword"
					value={repeatPassword}
					placeholder="repeatPassword"
					onChange={onChange}
					onBlur={onBlur}
				/>
				<button type="submit" disabled={newError !== null}>
					Зарегестрироваться
				</button>
				<button onClick={resetError}>Перезапустить</button>
			</form>
		</div>
	)
}
