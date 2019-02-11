import React, { Component } from 'react';
import * as api from './api';
import Main from './Main';
import Error from './Error';
import Comments from './Comments';

class Article extends Component {
    state = {
        title: '',
        author: '',
        article_id: 0,
        topic: '',
        body: '',
        created_at: Number,
        comment_count: Number,
        votes: Number,
        err: null,
        count: 0
    }
    render() {
        const { err } = this.state;
        return (
            err ? <Error /> :
            <div className="Article">
            <Main article={this.state} />
            <Comments article={this.state} user_id={this.props.user_id} />
            </div>
        );
    }

    componentDidMount() {
        this.fetchArticle();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.fetchArticle();
            this.setState({ count: 1 });
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