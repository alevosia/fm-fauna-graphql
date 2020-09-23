import React from 'react'
import axios from 'axios'
import styles from './todo.module.css'

const Todo = ({ todo, fetchTodos }) => {
	const toggleCompleted = () => {
		axios
			.post('/api/toggle-completed', {
				id: todo._id,
				text: todo.text,
				completed: !todo.completed,
			})
			.then(fetchTodos)
	}

	return (
		<>
			<label htmlFor={`todo-toggle-${todo._id}`} className={styles.label}>
				Mark Complete
			</label>
			<input
				id={`todo-toggle-${todo._id}`}
				type="checkbox"
				className={styles.toggle}
				checked={todo.completed}
				onChange={toggleCompleted}
			/>
			<p
				className={`${styles.text} ${
					todo.completed && styles.completed
				}`}
			>
				{todo.text}
			</p>
		</>
	)
}

export default Todo
