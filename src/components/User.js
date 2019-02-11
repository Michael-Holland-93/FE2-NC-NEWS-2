import React, { Component } from 'react';
import * as api from './api';
import Error from './Error';
import ObjectMapper from './ObjectMapper';

class User extends Component {
    state = {
        user: {},
        err: null
    }
    render() {
        const { err } = this.state;
        return (
            err ? <Error /> :
            <div className="user_container">
                <main className="user">
                    <ObjectMapper array={[this.state.user]} /> 
                </main>
                <div className="userSidebar">
                    <img src={this.state.user.avatar_url} alt="avatar" />
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.fetchUsernames()
    }

    fetchUsernames = () => {
        api.getUserByUsername(this.props.username)
        .then((user) => {
            this.setState({ user })
        })
        .catch(err => {
            this.setState({ err })
        })
    }

}

export default User;