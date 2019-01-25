import React, { Component } from 'react';
import * as api from './api';

class Authorisation extends Component {
    state = ({
        username: '',
        err: null
    })
    render() {
        return this.props.user ? this.props.children 
        :    <div>
                <form onSubmit={this.handleSubmit} id="submittedUsername">
                    <label>Username</label>
                    <input type="text" id="username" onChange={this.handleChange}/>
                    <button >Submit</button>
                </form>
            </div>
    }

    handleChange = (event) => {
        event.preventDefault();
        const username = event.target.value;
        this.setState({ username });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        api.getUsernames().then((usernames) => {
            usernames.forEach(({username}) => {
                if (username === this.state.username) {
                    this.props.setUser(username);
                }
            })
        })
        .catch(err => {
            this.setState({ err })
        })
    }


}

export default Authorisation;