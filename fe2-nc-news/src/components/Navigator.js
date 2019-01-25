import React, { Component } from 'react';
import { Link, Router } from '@reach/router';
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
                    return <span key={topic.slug}><Link to={`/topics/${topic.slug}`} >{topic.slug}</Link></span>
                })}
            <span>
                <p>Logged in as {this.props.user}</p><button onClick={this.props.logout}>Logout</button>
                </span>
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

    loggedIn = () => {
        if (this.props.user !== '') {
            
        }
    }

}

export default Navigator;