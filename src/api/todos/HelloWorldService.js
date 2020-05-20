import axios from 'axios'

class HelloWorldService {
    executeHelloWorldService() {
        return axios.get('http://localhost:8080/to-do-app/hello')
    }
}

export default new HelloWorldService()