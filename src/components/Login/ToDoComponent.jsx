import React, {Component} from "react";
import moment from "moment";
import {Formik, Field, Form} from "formik";

class  ToDoComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id : this.props.match.params.name,
            description : 'Learn Forms',
            targetDate : moment(new Date()).format('YYYY-MM-DD')

        }
    }
    render() {
        return <div>
                <h1>ToDo</h1>
                    <div className="container">
                        <Formik>
                            {
                                (props) => (
                                    <Form>
                                        <fieldset className="form-group">
                                            <label>Description</label>
                                            <Field className="form-control" type="text" name="description"/>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label>Date</label>
                                            <Field className="form-control" type="date" name="targetDate"/>
                                        </fieldset>
                                        <button className="btn btn-success" type="submit">Update</button>
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
        </div>
    }
}

export default ToDoComponent