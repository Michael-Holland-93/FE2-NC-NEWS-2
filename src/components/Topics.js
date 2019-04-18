import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from './api';
import Error from './Error';
import '../styling/Topics.css';

class Topics extends Component {
    state = ({
        topics: [],
        err: null
    })
    render() {
        const { err } = this.state;
        return (
            err ? <Error /> :
            <div>
                {this.state.topics.map((topic) => {
                    return <Link to={`/topics/${topic.slug}`} id={"text"}><span key={topic.slug} id={"tv"}>{topic.slug}</span></Link>
                })}
            </div>
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

}

export default Topics;