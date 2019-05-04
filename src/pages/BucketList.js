import React from 'react';
import { ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, Badge } from 'reactstrap';
import axios from 'axios';
import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';

const token = localStorage.getItem('token');

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
            id: '',
            loggedIn: false,
            message: '',
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        if (token) {
            this.setState({
                loggedIn: true,
            })

        } else {
            this.setState({
                loggedIn: false,
            })
        }


        axios({
            method: 'GET',
            url: 'https://bucketlit.herokuapp.com/api/v1/items/',
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
            url: 'https://bucketlit.herokuapp.com/api/v1/items/',
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
        let { loggedIn } = this.state;
        let button = loggedIn === false
            ? <Button style={{ backgroundColor: '#F49F0A', border: 'white' }} className="float-right" ><Link class="button" to='/login/'>Login</Link></Button>
            : <Button style={{ backgroundColor: '#F49F0A', border: 'white' }} onClick={this.toggle} className="float-right" >New</Button>
        return (
            <>
                <Navigation />
                <ListGroup>
                    <ListGroupItem> {button}
                        <h1>My Bucket List</h1>
                        <div>
                            <Badge style={{ backgroundColor: '#d05353', color: '#023C40' }}>Lifestyle</Badge>
                            <Badge style={{ backgroundColor: '#e58f65', color: '#023C40' }}>Travel</Badge>
                            <Badge style={{ backgroundColor: '#f9e784', color: '#023C40' }}>Self-Satisfaction</Badge>
                            <Badge style={{ backgroundColor: '#f1e8b8', color: '#023C40' }}>Self-Care</Badge>
                            <Badge style={{ backgroundColor: '#F5F5F5', color: '#023C40' }} > Skills</Badge>
                            <Badge style={{ backgroundColor: 'white', color: '#023C40' }} > Others</Badge>
                        </div>
                    </ListGroupItem>
                    <ListGroupItem>Press item for more</ListGroupItem>
                    {this.state.bucket_lists.map(item =>
                        item.complete === true
                            ? <ListGroupItem style={{ backgroundColor: '#e58f65' }}><strike><a class="linkA" href={`/item/${item.id}`}>{item.title}</ a></strike></ListGroupItem>
                            : item.category === 'Travel'
                                ? <ListGroupItem style={{ backgroundColor: '#e58f65' }}><a class="linkA" href={`/item/${item.id}`}>{item.title}</ a></ListGroupItem>
                                : item.category === 'Lifestyle'
                                    ? <ListGroupItem style={{ backgroundColor: '#d05353' }}><a class="linkA" href={`/item/${item.id}`}>{item.title}</ a></ListGroupItem>
                                    : item.category === 'Self-Satisfaction'
                                        ? <ListGroupItem style={{ backgroundColor: '#f9e784' }}><a class="linkA" href={`/item/${item.id}`}>{item.title}</ a></ListGroupItem>
                                        : item.category === 'Self-Care'
                                            ? <ListGroupItem style={{ backgroundColor: '#f1e8b8' }}><a class="linkA" href={`/item/${item.id}`}>{item.title}</ a></ListGroupItem>
                                            : item.category === 'Skills'
                                                ? <ListGroupItem style={{ backgroundColor: '#F5F5F5' }}><a class="linkA" href={`/item/${item.id}`}>{item.title}</ a></ListGroupItem>
                                                : <ListGroupItem><a class="linkA" href={`/item/${item.id}`}>{item.title}</ a></ListGroupItem>



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