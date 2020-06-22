import axios from 'axios'

class ToDoService {
    retrieveAllTodosService(name) {
        return axios.get(`http://localhost:8080/users/${name}/todos`)
    }

    retrieveTodo(name, id) {
        return axios.get(`http://localhost:8080/users/${name}/todos/${id}`)
    }

    updateTodo(name, id, todo) {
        return axios.put(`http://localhost:8080/users/${name}/todos/${id}`, todo)
    }

    createTodo(name, todo) {
        return axios.post(`http://localhost:8080/users/${name}/todos/`, todo)
    }

    deleteTodo(name, id) {
        return axios.delete(`http://localhost:8080/users/${name}/todos/${id}`)
    }
}

export default new ToDoService()