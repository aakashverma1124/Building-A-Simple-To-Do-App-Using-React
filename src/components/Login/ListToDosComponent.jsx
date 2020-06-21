import React, {Component} from "react";
import ToDoService from "../../api/todos/ToDoService";
import AuthenticationService from "./AuthenticationService";

class ListToDosComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos :
                [
                    // {id: 1, description: "Learn Java", done: false, targetDate: new Date()},
                    // {id: 2, description: "Learn React", done: false, targetDate: new Date()},
                    // {id: 3, description: "Learn AR", done: false, targetDate: new Date()},
                    // {id: 4, description: "Learn Mongo", done: false, targetDate: new Date()},
                ]
        }
    }

    componentDidMount() {
        let username = AuthenticationService.getLoggedInUser()
        ToDoService.retrieveAllTodosService(username)
            .then(
                response => {
                    this.setState({todos : response.data})
                }
            )

    }


    render() {
        return (
            <div>
                <h1>ToDos List</h1>
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Completed</th>
                            <th>Target Date</th>
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