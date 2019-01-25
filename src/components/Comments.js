import React, { Component } from 'react';
import * as api from './api';
import Votes from './Votes';
import Error from './Error';

class Comments extends Component {
    state = {
        comments: [],
        err: null,
        page: 0
    }
    render() {
        const { err } = this.state;
        return (
            err ? <Error /> :
            <div>
                <div>
                    <h3>Comments about {this.props.article.title}</h3>
                </div>
                <ul>
                    {this.state.comments.map((comment) => {
                        let num = 0;
                    for (var key in comment) {
                        num = num + 1;
                    }
                    const arr = [];
                    let count = 0;
                        for (var key in comment) {
                        arr.push(key + ':' + ' ' + comment[key]);
                        count = count + 1;
                        if (count < num) {
                            arr.push(', ');
                        }
                    }
                    arr.push(<br />)
                    return <li>{arr}
                    <Votes type='comments' id={this.props.article.article_id} votes={this.props.article.votes} comment_id={comment.comment_id} comment_votes={comment.votes} />
                    </li>;
                })}
                </ul>
                <div>
                    <form onSubmit={this.handleSubmit}>
                    <button onClick={() => {this.handleClick(-1)}} disabled={this.state.page === 0}>Previous page</button>
                    <button onClick={() => {this.handleClick(1)}} disabled={this.state.comments.length === 0}>Next page</button>
                    </form>
                </div>
            </div>
        );
    }

    getComments(page) {
        api.getCommentsByArticleId(this.props.article.article_id, page)
        .then((comments) => {
            this.setState({
                comments
            })
        })
    }

    componentDidMount() {
        this.getComments(this.state.page);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.article !== this.props.article) {
            this.getComments(this.state.page);
        }
        if (prevState.page !== this.state.page) {
            this.getComments(this.state.page);
        }
    }

    handleClick = (increment) => {
        this.setState({ page: this.state.page + increment });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.getComments(this.state.page);
    }

}

export default Comments;