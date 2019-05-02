import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

export default class Login extends React.Component {
    state = {
        email: '',
        password: '',
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
            url: 'http://localhost:5000/api/v1/sessions/',
            data: {
                email: this.state.email,
                password: this.state.password,
            },
        })
            .then(response => {
                console.log(response)
                if (response.data.status === "success") {
                    // Save auth token and user details into local storage
                    localStorage.setItem('token', response.data['auth_token']);
                    localStorage.setItem('userId', response.data.user['id']);
                    localStorage.setItem('firstName', response.data.user['first_name']);
                    localStorage.setItem('lastName', response.data.user['last_name']);
                    localStorage.setItem('dob', response.data.user['dob']);
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
                    <h1>Login</h1>
                    <hr />
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
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={this.handleInput}
                        />
                    </FormGroup>

                    <p>Don't have an account? <a href="/register/">Register</a></p>
                    <Button onClick={this.handleSubmit} color="primary" className="float-right">Login</Button>
                </Form>
            </div >
        );
    }
}