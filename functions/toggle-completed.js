const sendQuery = require('./utils/send-query')

const TOGGLE_COMPLETED = `
    mutation($id: ID!, $text: String!, $completed: Boolean!) {
        updateTodo(id: $id, data: { text: $text, completed: $completed }) {
            _id
            text
            completed
        }
    }
`

exports.handler = async (event) => {
	const { id, text, completed } = JSON.parse(event.body)
	const { data, errors } = await sendQuery(TOGGLE_COMPLETED, {
		id,
		text,
		completed,
	})

	if (errors) {
		return {
			statusCode: 500,
			body: JSON.stringify(errors),
		}
	}

	return {
		statusCode: 200,
		body: JSON.stringify({ updatedTodo: data.updateTodo }),
	}
}
