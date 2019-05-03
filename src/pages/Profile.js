import React from 'react';
import moment from 'moment';


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastName: localStorage.getItem('lastName'),
            firstName: localStorage.getItem('firstName'),
            dob: localStorage.getItem('dob'),
            countdown: '',
        };
    }

    componentDidMount() {
        this.countdown();
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
            <div className="text-center">
                <h2>{this.state.firstName} {this.state.lastName},</h2>
                <br />
                <h2>You have been living for</h2>
                <h1>{this.state.countdown}</h1>
                <h2>days</h2>
            </div>
        )

    }
}

export default Profile;