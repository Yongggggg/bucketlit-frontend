import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';

const token = localStorage.getItem('token')

class ItemEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {},
            id: '',
            title: '',
            category: '',
            description: '',
            start_by: '',
            completed_by: '',
            complete: false,
            error: ''
        };
    }

    componentDidMount() {

        axios({
            method: 'GET',
            url: `http://localhost:5000/api/v1/items/${this.props.item_id}/`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                this.setState({
                    item: response.data.item[0],
                    id: response.data.item[0].id,
                    title: response.data.item[0].title,
                    category: response.data.item[0].category,
                    description: response.data.item[0].description,
                    start_by: response.data.item[0].start_by,
                    completed_by: response.data.item[0].completed_by,
                    complete: response.data.item[0].complete
                })
                console.log(this.state)
            })
            .catch(error => {
                console.log(error);
            })

    }

    handleInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = () => {
        axios({
            method: 'PUT',
            url: `http://localhost:5000/api/v1/items/${this.props.item_id}/`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                title: this.state.title,
                category: this.state.category,
                start_by: this.state.start_by,
                description: this.state.description,
                completed_by: this.state.completed_by,
                complete: this.state.complete
            }
        })
            .then(response => {
                console.log(response)
                this.props.toggleEdit();
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    error: 'Please pick a date, you can change it later.'
                })
            })


    }


    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggleEdit}>
                <ModalHeader toggle={this.props.toggleEdit}>Edit</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="Title">Title</Label>
                            <Input
                                type="title"
                                name="title"
                                id="title"
                                placeholder="Title"
                                value={this.state.title}
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
                                value={moment(this.state.start_by).format("YYYY-MM-DD")}
                                onChange={this.handleInput}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="completeDatetime">Completed By</Label>
                            <Input
                                type="date"
                                name="date"
                                id="completed_by"
                                placeholder="date placeholder"
                                value={moment(this.state.completed_by).format("YYYY-MM-DD")}
                                onChange={this.handleInput}
                            />
                            <FormText>{this.state.error}</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for="category">Category</Label>
                            <Input type="select" name="select" id="category" value={this.state.category} onChange={this.handleInput}>
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
                            <Input type="textarea" name="text" id="description" value={this.state.description} onChange={this.handleInput} />
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" checked={this.state.complete} onChange={() => this.setState(prevState => ({
                                    complete: !prevState.complete
                                }))} />{' '}
                                Completed
                            </Label>
                        </FormGroup>
                    </Form>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleSubmit}>Save</Button>
                    <Button color="secondary" onClick={this.props.toggleEdit}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default ItemEdit;
