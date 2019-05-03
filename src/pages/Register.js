import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

export default class Register extends React.Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        dob: ''
    }

    handleInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/v1/users/',
            data: {
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                dateOfBirth: this.state.dob
            },
        })
            .then(response => {
                if (response.data.status === "success") {
                    console.log(response)
                } else {
                    console.log("failed")
                }
            })
            .catch(error => {
                console.log(error);
            })
    }


    render() {
        return (
            <div className="container">
                <Form>
                    <h1>Register</h1>
                    <hr />
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="firstName">First Name</Label>
                                <Input type="firstName" name="firstName" id="firstName" placeholder="First Name" onChange={this.handleInput} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="lastName">Last Name</Label>
                                <Input type="lastName" name="lastName" id="lastName" placeholder="Last Name" onChange={this.handleInput} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="xxx@example.com"
                            onChange={this.handleInput}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={this.handleInput}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="dateOfBirth">Date of Birth</Label>
                        <Input
                            type="date"
                            name="date"
                            id="dob"
                            placeholder="date placeholder"
                            onChange={this.handleInput}
                        />
                    </FormGroup>
                    <p>Already have an account? <a href='/login/'>Login</a></p>
                    <Button onClick={this.handleSubmit} color="primary" className="float-right">Register</Button>
                </Form>
            </div >
        );
    }
}