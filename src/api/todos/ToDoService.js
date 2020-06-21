import axios from 'axios'

class ToDoService {
    retrieveAllTodosService(name) {
        return axios.get(`http://localhost:8080/users/${name}/todos`)
    }
}

export default new ToDoService()