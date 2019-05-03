import React from 'react';
import { ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';



class BucketList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bucket_lists: [],
            modal: false,
            title: '',
            category: '',
            start_by: '',
            description: '',
            id: ''
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem('token');

        axios({
            method: 'GET',
            url: 'http://localhost:5000/api/v1/items/',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                this.setState({
                    bucket_lists: response.data.items
                })
                console.log(this.state.bucket_lists)
            })
            .catch(error => {
                console.log(error);
            })
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');

        axios({
            method: 'POST',
            url: 'http://localhost:5000/api/v1/items/',
            data: {
                title: this.state.title,
                category: this.state.category,
                start_by: this.state.start_by,
                description: this.state.description,
            },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response)
                window.location.reload()
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleMore = (event) => {
        let item_id = event.target.getAttribute('data-item_id');
        this.setState({
            id: item_id
        })
        console.log(this.state.id)
    }

    render() {
        return (
            <>
                <ListGroup>
                    <ListGroupItem><Button onClick={this.toggle} className="float-right" color="primary">New</Button><h1>My Bucket List</h1></ListGroupItem>
                    {this.state.bucket_lists.map(item =>
                        <ListGroupItem><a href={`/item/${item.id}`}>{item.title}</ a></ListGroupItem>
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
                                    onChange={this.handleInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="startDatetime">Start By</Label>
                                <Input
                                    type="date"
                                    name="date"
                                    id="start_by"
                                    placeholder="date placeholder"
                                    onChange={this.handleInput}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="category">Category</Label>
                                <Input type="select" name="select" id="category" onChange={this.handleInput}>
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
                        <Button color="primary" onClick={this.handleSubmit}>Add to List</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }

}

export default BucketList;