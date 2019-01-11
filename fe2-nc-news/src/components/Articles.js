import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import * as api from './api';
import Votes from './Votes';
import Error from './Error';

class Articles extends Component {
    state = ({
        articles: [],
        err: null
    })
    render() {
        const { err } = this.state;
        
        return (
            err ? <Error></Error> :
            <div>
                <ul key="articlesList">
                {this.state.articles.map((article) => {
                        // return <Votes article={article}><li key={article.id}>{article.title}</li></Votes>
                        return <li key={article.id}>{article.title}</li>
                })}
                </ul>
            </div>
        );
    }

    componentDidMount() {
        this.fetchArticles()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.topic !== prevProps.topic) {
            this.fetchArticles();
        }
    }

    fetchArticles = () => {
        api.getArticles(this.props.topic)
        .then((articles) => {
            this.setState({ articles })
        })
        .catch(err => this.setState({ err }))
    }
}

export default Articles;