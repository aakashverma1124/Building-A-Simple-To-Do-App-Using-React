import React, {Component} from "react";
import ToDoService from "../../api/todos/ToDoService";
import AuthenticationService from "./AuthenticationService";

class ListToDosComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos : [],
            message : null
        }
        this.onDeleteButtonClicked = this.onDeleteButtonClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
        this.onUpdateButtonClicked = this.onUpdateButtonClicked.bind(this)
    }

    componentDidMount() {
        this.refreshTodos()
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUser()
        ToDoService.retrieveAllTodosService(username)
            .then(
                response => {
                    this.setState({todos : response.data})
                }
            )
    }

    onDeleteButtonClicked(id) {
        let username = AuthenticationService.getLoggedInUser()
        ToDoService.deleteTodo(username, id)
            .then(
                response => {
                    this.setState({message : `Deletion of ${id} todo is Successful!`})
                    this.refreshTodos()
                }
            )

    }

    onUpdateButtonClicked(id) {
        this.props.history.push(`/todos/${id}`)

    }


    render() {
        return (
            <div>
                <h1>ToDos List</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Completed</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.todos.map (
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-danger" onClick={() => this.onDeleteButtonClicked(todo.id)}>Delete</button></td>
                                        <td><button className="btn btn-success" onClick={() => this.onUpdateButtonClicked(todo.id)}>Update</button></td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}


export default ListToDosComponent