import React, { Component } from 'react';
import * as api from './api';
import '../styling/AddComment.css';
import { Button } from 'react-bootstrap';

class AddComment extends Component {
    state = {
        title: '',
        body: '',
        comments: ''
    }
    render() {
        return (
            <div>
                <form >
                            <ul className="bulletPoints">
                                <li><label>Comment Body</label>
                                <input type="text" id="commentBody" onChange={this.setBody} /></li>
                                <li><Button className="button" onClick={this.addComment}>Add Comment</Button></li>
                            </ul>
                </form>
                <br />
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.comments !== this.state.comments) {
            console.log(this.state.comments, 'comments');
            this.getComments(this.props.page)
        }
    }

    getComments(page) {
        api.getCommentsByArticleId(this.props.article.article_id, page);
    }

    setTitle = (event) => {
        event.preventDefault();
        const title = event.target.value;
        this.setState({ title });
    }

    setBody = (event) => {
        event.preventDefault();
        const body = event.target.value;
        this.setState({ body });
    }

    addComment = (event) => {
        event.preventDefault();
        api.postComment(this.props.article.article_id, this.state.body, this.props.user_id)
        .then(comment => {
            console.log(comment);
            this.props.addNewComment(comment);
        })
    }

}

export default AddComment;