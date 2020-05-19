import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

class ToDoApp extends Component {
    render() {
        return (
            <div>
                <Router>
                    <HeaderComponent/>
                    <Switch>
                        <Route path="/" exact component={LoginComponent}/>
                        <Route path="/login" component={LoginComponent}/>
                        <Route path="/welcome/:name" component={WelcomeComponent}/>
                        <Route path="/todos" component={ListToDosComponent}/>
                        <Route path="/logout" component={LogoutComponent}/>
                        <Route component={ErrorComponent}/>
                    </Switch>
                    <FooterComponent/>
                </Router>
                {/*<LoginComponent />
                <WelcomeComponent />*/}
            </div>
        )
    }

}

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        console.log(isUserLoggedIn)
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="http://aboutaakash.in" className="navbar-brand">ToDos App</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn &&  <li><Link className="nav-link" to="/welcome/aakashverma">Home</Link></li>}
                        { isUserLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}


class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="text-muted">All rights reserved 2020 @aakashverma</span>
            </footer>
        )
    }
}

class LogoutComponent extends Component {
    render() {
        return (
            <>
                <h1>You are logged out.</h1>
                <div className="container">
                    Thank you for using our application.
                </div>
            </>
        )
    }
}


class ListToDosComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos :
                [
                    {id: 1, description: "Learn Java", done: false, targetDate: new Date()},
                    {id: 2, description: "Learn React", done: false, targetDate: new Date()},
                    {id: 3, description: "Learn AR", done: false, targetDate: new Date()},
                    {id: 4, description: "Learn Mongo", done: false, targetDate: new Date()},
                ]
        }
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

class WelcomeComponent extends Component {
    render() {
        return (
            <div>
                <h1>Welcome!</h1>
                Welcome {this.props.match.params.name}. You can manage your todos <Link to="/todos">here</Link>.
            </div>
        )
    }
}

function ErrorComponent() {
    return <div>This is an error page</div>

}

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : "aakashverma",
            password : "",
            hasLoginFailed: false,
            showSuccessfulMessage: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState({[event.target.name]:event.target.value})
    }

    loginClicked() {
        if(this.state.username === "aakashverma" && this.state.password === "hello") {
            AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
            this.props.history.push(`/welcome/${this.state.username}`)
            //this.setState({showSuccessfulMessage: true})
            //this.setState({hashLoginFailed: false})
        }
        else {
            this.setState({showSuccessfulMessage: false})
            this.setState({hasLoginFailed: true})
        }

    }

    render() {
        return (
            <>
                <div className="container">
                    <h1>Login</h1>
                    Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                    {/*<ShowInvalidCredentials hasLoginFailed = {this.state.hasLoginFailed} />*/}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccessfulMessage && <div>Login Successful</div>}
                    {/*<ShowSuccessMessage showSuccessfulMessage = {this.state.showSuccessfulMessage}/>*/}
                </div>
            </>
        )
    }

}



// function ShowInvalidCredentials(props) {
//         if (props.hasLoginFailed) {
//             return <div>Invalid Crendentails</div>
//         }
//         return null
// }
//
// function ShowSuccessMessage(props) {
//     if (props.showSuccessfulMessage) {
//         return <div>Login Successfull</div>
//     }
//     return null
// }

export default ToDoApp