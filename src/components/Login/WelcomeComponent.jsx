import React, {Component} from "react";
import {Link} from "react-router-dom";
import HelloWorldService from "../../api/todos/ToDoService";

class WelcomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            welcomeMessage : ''
        }
        this.retrieveHelloMessage = this.retrieveHelloMessage.bind(this);
        this.handleError = this.handleError.bind(this)
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
    }

    render() {
        return (
            <>
                <div className="container">
                    <h1>Welcome!</h1>
                    Welcome {this.props.match.params.name}. You can manage your todos <Link to="/todos">here</Link>.
                </div>
                <div className="container">
                    Click here to get hello message.
                    <button className="btn btn-success" onClick={this.retrieveHelloMessage}>Click Here</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </>
        )
    }

    retrieveHelloMessage() {
        HelloWorldService.executeHelloWorldService()
            .then(response => this.handleSuccessfulResponse(response))
    }

    handleError(error) {
        let errorMessage = ''
        if(error.message)
            errorMessage += error.message
        if (error.response && error.response.data)
            errorMessage += error.response.data.message

        this.setState({welcomeMessage: errorMessage})
    }

    handleSuccessfulResponse(response) {
        this.setState({welcomeMessage: response.data})
    }
}

export default WelcomeComponent