import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from './api';
import Error from './Error';

class Navigator extends Component {
    state = ({
        topics: [],
        err: null
    })
    render() {
        const { err } = this.state;
        return (
            err ? <Error /> :
            <nav className="Navigator">
            <span><Link to="/">Home</Link></span>
                {this.state.topics.map((topic) => {
                    return <span key={topic.slug}><Link to={`/topics/${topic.slug}`}>{topic.slug}</Link></span>
                })}
            <span><Link to="/users">Users</Link></span>
            {this.loggedIn()}
            </nav>
        );
    }

    componentDidMount() {
        api.getTopics()
        .then((topics) => {
            this.setState({ topics })
        })
        .catch(err => {
            this.setState({ err })
        })
    }

    loggedIn() {
        if (this.props.user !== '') {
            return (
                <span>
                <p>Logged in as {this.props.user}</p><button onClick={this.props.logout} className="button">Logout</button>
                </span>
            )
        }
    }

}

export default Navigator;