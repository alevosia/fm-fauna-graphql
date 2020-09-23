import React, { useState } from 'react'
import axios from 'axios'
import styles from './form.module.css'

const IDLE = 'IDLE'
const SENDING = 'SENDING'
const ERROR = 'ERROR'

const Form = ({ fetchTodos }) => {
	const [status, setStatus] = useState(IDLE)
	const [text, setText] = useState('')

	const handleSubmit = async (event) => {
		event.preventDefault()

		if (status !== IDLE || text === '') {
			return
		}

		setStatus(SENDING)

		const response = await axios('/api/create-todo', {
			method: 'POST',
			data: { text },
		})

		if (response.status !== 200) {
			console.error(response.statusText)
			setStatus(ERROR)
			return
		}

		fetchTodos()
		setStatus(IDLE)
		setText('')
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<label className={styles.label}>
				Add a Todo
				<input
					type="text"
					className={styles.input}
					value={text}
					onChange={(event) => setText(event.target.value)}
					required
				/>
			</label>
			<button className={styles.button}>Save Todo</button>
		</form>
	)
}

export default Form
