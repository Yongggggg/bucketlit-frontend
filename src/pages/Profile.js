import React from 'react';
import moment from 'moment';
import Navigation from '../components/Navigation'
import axios from 'axios';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastName: localStorage.getItem('lastName'),
            firstName: localStorage.getItem('firstName'),
            dob: localStorage.getItem('dob'),
            date: moment().startOf('days'),
            countdown: '',
            quotes: {},
            loggedIn: false,

            message: {},
        };
    }

    componentDidMount() {
        if (this.state.lastName) {
            this.setState({
                loggedIn: true,
                message: { 'greeting': 'Welcome!', 'frontCountdown': "You have been living for", 'backCountdown': "seconds." }

            })
            this.countdown(this.state.dob, 'seconds');
            this.handleTime();
        } else {
            this.setState({
                loggedIn: false,
                message: { 'greeting': "Hey", "name": "Stranger!", 'backCountdown': "seconds has passed starting from Today" }
            })
            this.handleTime();
            this.countdown(this.state.date, 'seconds');
        }


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

    countdown = (date, format) => {
        let now = moment();
        const end = moment(date);
        let countdown = now.diff(end, format)
        this.setState({
            countdown: countdown
        })

    }

    handleTime = () => {
        const timer = setInterval(() => {
            this.setState({
                countdown: this.state.countdown + 1
            })
        }, 1000)
        this.setState({
            timer: timer
        })
    }

    render() {
        let { loggedIn } = this.state;
        let message = loggedIn === false
            ? <h6>Don't waste your time! Try <a class="link" href='/register/'>REGISTER</a> or <a class="link" href='/login/'>LOGIN</a>!<br /> BucketLit let you record your journey in achieving Your Bucket List.</h6>
            : <h6>Time is running out, why not live life to the fullest? <a class='link' href='/bucketlist/'>BucketList</a></h6>
        return (
            <>
                <Navigation />
                <div className="text-center container profile">
                    <h2>{this.state.message.greeting} {this.state.firstName} {this.state.lastName}, {this.state.message.name}</h2>
                    <h3>{this.state.message.frontCountdown}</h3>
                    <h2>{this.state.countdown}</h2>
                    <h3>{this.state.message.backCountdown}</h3>
                    {message}
                </div>
                <br />
                <div className="container quote text-center">
                    <h6 class='font-italic'>Quote of the Day</h6>
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