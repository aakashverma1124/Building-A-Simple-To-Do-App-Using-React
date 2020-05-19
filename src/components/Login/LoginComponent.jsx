import React, {Component} from "react";
import AuthenticationService from "./AuthenticationService";

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

export default LoginComponent