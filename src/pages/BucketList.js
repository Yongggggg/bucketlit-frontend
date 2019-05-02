import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';


class BucketList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bucket_lists: [
                { "title": "Let's go Paris", "category": "Travel", "complete": false },
                { "title": "Kiss a guy", "category": "Life", "complete": false },
                { "title": "Go clubbing", "category": "Life", "complete": false }
            ],
            modal: false,
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        axios({
            method: 'GET',
            url: 'https://localhost:5000/api/v1/bucketlist/',
            headers: {
                'Authorization': `Bearer ${token}`
            }

        }).then(response => {
            this.setState({
                bucket_lists: response.data
            })
        })

    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleClick = () => {
        this.setState({
            modal: true
        })
    }

    render() {
        return (
            <>
                <ListGroup>
                    <ListGroupItem><Button onClick={this.toggle} className="float-right" color="primary">New</Button><h1>My Bucket List</h1></ListGroupItem>
                    {this.state.bucket_lists.map(item =>
                        <ListGroupItem>{item.title}</ListGroupItem>
                    )}
                </ListGroup>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>New Stuff</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="Title">Title</Label>
                                <Input
                                    type="title"
                                    name="title"
                                    id="title"
                                    placeholder="Title"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="completeDatetime">Completed By</Label>
                                <Input
                                    type="date"
                                    name="date"
                                    id="exampleDate"
                                    placeholder="date placeholder"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="category">Category</Label>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>Lifestyle</option>
                                    <option>Self-Care</option>
                                    <option>Self-Satisfaction</option>
                                    <option>Skills</option>
                                    <option>Travel</option>
                                    <option>Others</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input type="textarea" name="text" id="description" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Add to List</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }

}

export default BucketList;