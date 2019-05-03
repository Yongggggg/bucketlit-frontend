import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class JournalNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            reflection: '',

        };
    }


    handleInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleAdd = () => {
        this.props.toggleNew();
        const token = localStorage.getItem('token');
        console.log(this.state.imageUrl)

        axios({
            method: 'POST',
            url: `http://localhost:5000/api/v1/journals/${this.props.item_id}/`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                title: this.state.title,
                date: this.state.date,
                reflection: this.state.reflection,
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



    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggleNew} className={this.props.className}>
                <ModalHeader toggle={this.toggleNew}>New Journal</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup row>
                            <Label for="title" sm={2}>Title*</Label>
                            <Col sm={10}>
                                <Input type="title" name="title" id="title" placeholder="Title" onChange={this.handleInput} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="date" sm={2}>Date*</Label>
                            <Col sm={10}>
                                <Input type="date" name="date" id="date" placeholder="date placeholder" onChange={this.handleInput} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="reflection" sm={2}>Reflection</Label>
                            <Col sm={10}>
                                <Input type="textarea" name="reflection" id="reflection" onChange={this.handleInput} />
                            </Col>
                        </FormGroup>>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleAdd}>Add</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggleNew}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default JournalNew;
