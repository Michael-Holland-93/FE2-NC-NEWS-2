import React, { Component } from 'react';
import { Link, Router } from '@reach/router';
import * as api from './api';

class Navigator extends Component {
    state = ({
        topics: []
    })
    render() {
        return (
            <nav className="Navigator">
            <span><Link to="/">Home</Link></span>
                {this.state.topics.map((topic) => {
                    return <span><Link to={`/topics/${topic.slug}`} key={topic.slug}>{topic.slug}</Link></span>
                })}
            </nav>
        );
    }

    componentDidMount() {
        api.getTopics()
        .then((topics) => {
            this.setState({ topics })
        });
    }

}

export default Navigator;