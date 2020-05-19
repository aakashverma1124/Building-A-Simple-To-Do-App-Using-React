import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AuthenticatedRoute from './AuthenticatedRoute'
import LoginComponent from "./LoginComponent";
import ListToDosComponent from "./ListToDosComponent";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import LogoutComponent from "./LogoutComponent";
import WelcomeComponent from "./WelcomeComponent";
import ErrorComponent from "./ErrorComponent";

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
export default ToDoApp