import React, { Component } from 'react';
import Comments from './Comments';
import * as api from './api';
import Sidebar from './Sidebar';
import Main from './Main';
import Error from './Error';

class Article extends Component {
    state = {
        title: '',
        author: '',
        article_id: Number,
        topic: '',
        body: '',
        created_at: Number,
        comment_count: Number,
        votes: Number,
        err: null
    }
    render() {
        const { err } = this.state;
        return (
            err ? <Error /> :
            <div className="Article">
            <Main article={this.state} />
            <Sidebar article={this.state} />
            </div>
        );
    }

    componentDidMount() {
        this.fetchArticle();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.fetchArticle();
        }
    }

    fetchArticle() {
        api.getArticleByArticleId(this.props.article_id)
        .then((article) => {
            this.setState({ 
                title: article.title,
                author: article.author,
                article_id: article.article_id,
                topic: article.topic,
                body: article.body,
                created_at: article.created_at,
                comment_count: article.comment_count,
                votes: article.votes
            })
        })
        .catch(err => {
            this.setState({ err })
        })
    }

}

export default Article;