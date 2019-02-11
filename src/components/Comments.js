import React, { Component } from 'react';
import * as api from './api';
import Error from './Error';
import ObjectMapper from './ObjectMapper';
import AddComment from './AddComment';

class Comments extends Component {
    _isMounted = false;

    state = {
        comments: [],
        err: null,
        page: 0
    }
    render() {
        const { err } = this.state;
        return (
            err ? <Error /> :
            <div className="comments">
                <div>
                    <h3>Comments about {this.props.article.title}</h3>
                </div>
                <div>
                <AddComment addNewComment={this.addNewComment} user_id={this.props.user_id} article={this.props.article} comments={this.state.comments} />
                </div>
                <div>
                <ObjectMapper array={this.state.comments} id={this.props.article.article_id} votes={this.props.article.votes} />
                </div>
                <div>
                    <form onSubmit={this.handleSubmit} >
                    <button onClick={() => {this.handleClick(-1)}} disabled={this.state.page === 0} className="button">Previous page</button>
                    <button onClick={() => {this.handleClick(1)}} disabled={this.state.comments.length === 0} className="button">Next page</button>
                    </form>
                </div>
            </div>
        );
    }

    getComments(page) {
        api.getCommentsByArticleId(this.props.article.article_id, page)
        .then((comments) => {
            if (this._isMounted === true) {
            this.setState({
                comments
            })
        }
        })
    }

    componentDidMount() {
        this._isMounted = true;
        this.getComments(this.state.page);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.article !== this.props.article) {
            this.getComments(this.state.page);
        }
        if (prevState.page !== this.state.page) {
            this.getComments(this.state.page);
        }
        if (prevState.comments !== this.state.comments) {
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

    addNewComment = (newComment) => {
        this.setState((prevState) => ({
            comments: [newComment, ...prevState.comments]
        }))
    }

    removeComment = (filterComment) => {
        const filteredComments = this.state.comments.filter((comment) => {
            if (comment.comment_id !== filterComment.comment_id) {
                return comment;
            }
        })
        this.setState({
            comments: filteredComments
        })
    }

}

export default Comments;