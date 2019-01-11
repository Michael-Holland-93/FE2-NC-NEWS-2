import React, { Component } from 'react';
import * as api from './api';

class Authorisation extends Component {
    state = ({
        username: '',
        failedAttempt: true
    })
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} id="submittedUsername">
                    <label>Username</label>
                    <input type="text" id="username" />
                    <button onChange={this.handleChange}>Submit</button>
                </form>
            </div>
        );
    }

    componentDidMount() {

    }

    handleChange(event) {
        event.preventDefualt();
        const username = event.target.value;
        this.setState({ username });
    }

    handleSubmit(event) {
        event.preventDefualt();
        api.getUsernames(this.props.username).then((usernames) => {
            console.log(usernames)
        })
    }


}

export default Authorisation;