import React from 'react';
import { Card, Button, CardText, CardHeader, CardColumns } from 'reactstrap';
import axios from 'axios';
import JournalNew from '../containers/JournalNew';
import ItemEdit from '../containers/ItemEdit';
import moment from 'moment';
import Navigation from '../components/Navigation';

const token = localStorage.getItem('token');

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {},
            journals: [],
            editModal: false,
            newModal: false,
        };

        this.toggleNew = this.toggleNew.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
    }

    toggleNew() {
        // Toggle "Add New Journal" Modal
        this.setState(prevState => ({
            newModal: !prevState.newModal
        }));
    }

    toggleEdit() {
        // Toggle "Edit" Modal
        this.setState(prevState => ({
            editModal: !prevState.editModal
        }));
    }

    componentDidMount() {

        axios({
            // GET Item Data 
            method: 'GET',
            url: `http://localhost:5000/api/v1/items/${this.props.match.params.id}/`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                this.setState({
                    item: response.data.item[0]
                })
                console.log(this.state.item)
            })
            .catch(error => {
                console.log(error);
            })


        axios({
            // GET Journal Data
            method: 'GET',
            url: `http://localhost:5000/api/v1/journals/${this.props.match.params.id}/`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                this.setState({
                    journals: response.data.journal
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleDelete = (event) => {
        let journal_id = event.target.getAttribute('data-journal_id');
        axios({
            method: 'DELETE',
            url: `http://localhost:5000/api/v1/journals/delete/${journal_id}/`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response)
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            })


    }

    render() {
        return (
            <>
                <Navigation />
                <div className="container-fluid">

                    <h1>{this.state.item.title} <Button size="sm" onClick={this.toggleEdit} color="primary">Edit</Button></h1>
                    <ItemEdit isOpen={this.state.editModal} toggleEdit={this.toggleEdit} item_id={this.props.match.params.id} />

                    <h4>{moment(this.state.item.start_by).format('ll')} - {moment(this.state.item.completed_by).format('ll')}</h4>
                    <p>{this.state.item.category}</p>
                    <p>{this.state.item.description}</p>

                    <Button onClick={this.toggleNew} color="primary">Add New Journal</Button>
                    <JournalNew isOpen={this.state.newModal} toggleNew={this.toggleNew} item_id={this.props.match.params.id} />
                    <hr />

                    <CardColumns>
                        {this.state.journals.map(journal =>
                            <>
                                <Card body className="text-center">
                                    <CardHeader>
                                        {journal.title} <br />
                                        {moment(journal.date).format("LL")}
                                    </CardHeader>
                                    <CardText>{journal.reflection}</CardText>
                                    <Button outline color="danger" onClick={this.handleDelete} data-journal_id={journal.id}>Delete</Button>
                                </Card>
                            </>
                        )}
                    </CardColumns >
                </div >
            </>
        )
    }
}

export default Item;