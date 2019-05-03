import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, CardHeader, CardImg, CardColumns } from 'reactstrap';
import axios from 'axios';
import JournalNew from '../containers/JournalNew';
import moment from 'moment';

const token = localStorage.getItem('token');

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {},
            journals: [],
            editModal: false,
            newModal: false,

            journal_id: '',
            journal_title: '',
            journal_date: '',
            journal_reflection: ''
        };

        this.toggleNew = this.toggleNew.bind(this);
    }

    toggleNew() {
        this.setState(prevState => ({
            newModal: !prevState.newModal
        }));
    }

    componentDidMount() {

        axios({
            method: 'GET',
            url: `http://localhost:5000/api/v1/items/${this.props.match.params.id}/`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response)
                this.setState({
                    item: response.data.item[0]
                })
            })
            .catch(error => {
                console.log(error);
            })


        axios({
            method: 'GET',
            url: `http://localhost:5000/api/v1/journals/${this.props.match.params.id}/`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response)
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
            <div className="container">
                <h1>{this.state.item.title}</h1>
                <h4>{moment(this.state.item.start_by).format('ll')}</h4>
                <p>{this.state.item.category}</p>
                <p>{this.state.item.description}</p>
                <Button onClick={this.toggleNew} color="primary">Add New Journal</Button>
                <JournalNew isOpen={this.state.newModal} toggleNew={this.toggleNew} item_id={this.props.match.params.id} />
                <hr />
                <CardColumns>
                    {this.state.journals.map(journal =>
                        <>
                            <Card body className="text-center">
                                <CardHeader>{journal.title}</CardHeader>
                                <CardImg width="100%" alt="Image" />
                                <CardTitle>{moment(journal.date).format("LL")}</CardTitle>
                                <CardText>{journal.reflection}</CardText>
                                <Button outline color="danger" onClick={this.handleDelete} data-journal_id={journal.id}>Delete</Button>
                            </Card>
                        </>
                    )}
                </CardColumns >
            </div>
        )
    }
}

export default Item;