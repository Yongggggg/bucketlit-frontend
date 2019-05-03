import React from 'react';
import moment from 'moment';
import Navigation from '../components/Navigation'
import unirest from 'unirest';
import axios from 'axios';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastName: localStorage.getItem('lastName'),
            firstName: localStorage.getItem('firstName'),
            dob: localStorage.getItem('dob'),
            countdown: '',
            quotes: {},
        };
    }

    componentDidMount() {
        this.countdown();
        var unirest = require('unirest');

        axios({
            // GET API for Quotes of the Day
            method: 'GET',
            url: "https://andruxnet-random-famous-quotes.p.rapidapi.com/?cat=famous&count=10",
            headers: {
                "X-RapidAPI-Host": "andruxnet-random-famous-quotes.p.rapidapi.com",
                "X-RapidAPI-Key": "db5c5d9abfmsh055b60003e7a964p1407dbjsnc5e7d6674725"
            }
        })
            .then(response => {
                this.setState({
                    quotes: response.data[0]
                })
            })
            .catch(error => {
                console.log(error);
            })

    }

    countdown = () => {
        let now = moment();
        const end = moment(this.state.dob);
        let countdown = now.diff(end, 'days')
        this.setState({
            countdown: countdown
        })

    }


    render() {
        return (
            <>
                <Navigation />
                <div className="text-center container">
                    <h2>{this.state.firstName} {this.state.lastName},</h2>
                    <br />
                    <h2>You have been living for</h2>
                    <h1>{this.state.countdown}</h1>
                    <h2>days</h2>
                    <br />
                    <h4>{this.state.quotes.quote}</h4>
                    <h6 className='text-center'>
                        -- {this.state.quotes.author}
                    </h6>
                </div>
            </>
        )

    }
}

export default Profile;