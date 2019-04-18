import React, { Component } from 'react';
import * as api from './api';
import Error from './Error';
import ObjectMapper from './ObjectMapper';
import AddComment from './AddComment';
import '../styling/Comments.css';

class Comments extends Component {
    _isMounted = false;

    state = {
        comments: [],
        err: null,
        page: 0,
        disable: false
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
                <ObjectMapper removeComment={this.removeComment} array={this.state.comments} id={this.props.article.article_id} votes={this.props.article.votes} />
                </div>
                <div>
                    <form onSubmit={this.handleSubmit} >
                    <button onClick={() => {this.handleClick(-1)}} disabled={this.state.page === 0} className="button">Previous page</button>
                    <button onClick={() => {this.handleClick(1)}} disabled={this.state.disable === true} className="button">Next page</button>
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
                comments,
                page
            })
            this.disable();
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
    }

    handleClick = (increment) => {
        this.setState({ page: this.state.page + increment });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.getComments(this.state.page);
        this.disable();
    }

    addNewComment = (newComment) => {
        this.setState((prevState) => ({
            comments: [newComment, ...prevState.comments]
        }))
        this.disable();
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
        this.getComments(this.state.page);
        this.disable();
    }

    disable = () => {
        api.getCommentsByArticleId(this.props.article.article_id, this.state.page + 1)
        .then((comments) => {
            if (comments.length === 0) {
                this.setState({
                    disable: true
                })
            } else {
                this.setState({
                    disable: false
                })
            }
        })
    }

}

export default Comments;