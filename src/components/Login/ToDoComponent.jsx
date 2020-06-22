import React, {Component} from "react";
import moment from "moment";
import {Formik, Field, Form, ErrorMessage} from "formik";
import AuthenticationService from "./AuthenticationService";
import ToDoService from "../../api/todos/ToDoService";

class  ToDoComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id : this.props.match.params.id,
            description : '',
            targetDate : moment(new Date()).format('YYYY-MM-DD')

        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        let username = AuthenticationService.getLoggedInUser()
        //console.log(username + " " + this.state.id)
        ToDoService.retrieveTodo(username, this.state.id)
            .then(response => this.setState({
                    description: response.data.description,
                    targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
                }))
    }

    validate(values) {
        let errors = {}
        if(!values.description) {
            errors.description = 'Enter a description'
        }
        else if (values.description.length < 5) {
            errors.description = 'Enters at least 5 characters in description.'
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Date.'
        }
        return errors;
    }

    onSubmit(values) {
        let username = AuthenticationService.getLoggedInUser()
        ToDoService.updateTodo(username, this.state.id, {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }).then(
            () => {
                this.props.history.push(`/todos`)
            }
        )
        console.log(values)
    }

    render() {
        //let description = this.state.description
        //let targetDate = this.state.targetDate
        let {description, targetDate} = this.state
        return <div>
                <h1>ToDo</h1>
                    <div className="container">
                        <Formik
                            initialValues={{description: description, targetDate: targetDate}}
                            onSubmit={this.onSubmit}
                            validate={this.validate}
                            enableReinitialize={true}
                        >
                            {
                                (props) => (
                                    <Form>
                                        <ErrorMessage name="description" className="alert alert-warning" component="div"/>
                                        <ErrorMessage name="targetDate" className="alert alert-warning" component="div"/>
                                        <fieldset className="form-group">
                                            <label>Description</label>
                                            <Field className="form-control" type="text" name="description"/>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label>Date</label>
                                            <Field className="form-control" type="date" name="targetDate"/>
                                        </fieldset>
                                        <button className="btn btn-success" type="submit">Save</button>
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
        </div>
    }
}

export default ToDoComponent