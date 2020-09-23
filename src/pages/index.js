import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './index.module.css'

import Todo from '../components/todo'
import Form from '../components/form'

const LOADING = 'LOADING'
const LOADED = 'LOADED'

export default () => {
	const [status, setStatus] = useState(LOADING)
	const [todos, setTodos] = useState(null)

	useEffect(() => {
		let canceled = false

		if (status !== LOADING) {
			return
		}

		axios('/api/get-all-todos').then((response) => {
			if (canceled === true) return

			if (response.status !== 200) {
				console.error('Error loading todos')
				console.error(response)
				return
			}

			const fetchedTodos = response.data.todos

			console.log(fetchedTodos)

			setTodos(fetchedTodos)
			setStatus(LOADED)
		})

		return () => {
			canceled = true
		}
	}, [status])

	const fetchTodos = () => {
		setStatus(LOADING)
	}

	return (
		<main>
			<h1 className={styles.heading}>JAMStack Todos</h1>
			<Form fetchTodos={fetchTodos} />
			{todos && todos.length > 0 ? (
				<ul className={styles.todos}>
					{todos.map((todo) => (
						<li key={todo._id} className={styles.todo}>
							<Todo todo={todo} fetchTodos={fetchTodos} />
						</li>
					))}
				</ul>
			) : (
				<p className={styles.loading}>Loading todos..</p>
			)}
		</main>
	)
}
