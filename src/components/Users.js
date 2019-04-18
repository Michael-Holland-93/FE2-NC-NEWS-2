import React, { Component } from 'react';
import { Link } from '@reach/router';
import Error from './Error';
import * as api from './api';
import '../styling/Users.css';

class Users extends Component {
    state = ({
        users: [],
        err: null
    })
    render() {
        const { err } = this.state;
        return (
            err ? <Error /> :
            <div className="Users">
                {this.state.users.map((user) => {
                    return <span key={user.username}><Link to={`/users/${user.username}`} username={user.username} >{user.username}</Link></span>
                })}
            </div>
        );
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = (page) => {
        api.getUsernames()
        .then((users) => {
            this.setState({ users })
        })
        .catch(err => this.setState({ err }))
    }

}

export default Users;