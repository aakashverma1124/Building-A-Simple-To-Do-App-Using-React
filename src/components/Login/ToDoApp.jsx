import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import AuthenticationService from './AuthenticationService';
import AuthenticatedRoute from './AuthenticatedRoute'
import LoginComponent from "./LoginComponent";

class ToDoApp extends Component {
    render() {
        return (
            <div>
                <Router>
                    <HeaderComponent/>
                    <Switch>
                        <Route path="/" exact component={LoginComponent}/>
                        <Route path="/login" component={LoginComponent}/>
                        <AuthenticatedRoute Route path="/welcome/:name" component={WelcomeComponent}/>
                        <AuthenticatedRoute path="/todos" component={ListToDosComponent}/>
                        <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
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

export default ToDoApp