import React, {Component} from "react";
import userEvent from "@testing-library/user-event";


class ToDoApp extends Component {
    render() {
        return (
            <div>
                <LoginComponent/>
            </div>
        )
    }

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
            this.setState({showSuccessfulMessage: true})
            this.setState({hashLoginFailed: false})
        }
        else {
            this.setState({showSuccessfulMessage: false})
            this.setState({hasLoginFailed: true})
        }

    }

    render() {
        return (
            <div>
                Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                <button onClick={this.loginClicked}>Login</button>
                {/*<ShowInvalidCredentials hasLoginFailed = {this.state.hasLoginFailed} />*/}
                {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
                {this.state.showSuccessfulMessage && <div>Login Successful</div>}
                {/*<ShowSuccessMessage showSuccessfulMessage = {this.state.showSuccessfulMessage}/>*/}
            </div>
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