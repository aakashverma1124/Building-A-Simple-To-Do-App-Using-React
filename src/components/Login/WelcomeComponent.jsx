import React, {Component} from "react";
import {Link} from "react-router-dom";
import HelloWorldService from "../../api/todos/HelloWorldService";

class WelcomeComponent extends Component {
    constructor(props) {
        super(props);

        this.retrieveHelloMessage = this.retrieveHelloMessage.bind(this);
    }

    render() {
        return (
            <>
                <div>
                    <h1>Welcome!</h1>
                    Welcome {this.props.match.params.name}. You can manage your todos <Link to="/todos">here</Link>.
                </div>
                <div>
                    Click here to get hello message.
                    <button className="btn btn-success" onClick={this.retrieveHelloMessage}>Click Here</button>
                </div>
            </>
        )
    }

    retrieveHelloMessage() {
        HelloWorldService.executeHelloWorldService()
            .then(response > console.log(response))
    }
}

export default WelcomeComponent