import React from 'react'

export const Input = ({ value, onChange, type, name, placeholder, onBlur }) => {
	return (
		<>
			<input
				type={type}
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				onBlur={onBlur}
			/>
		</>
	)
}
