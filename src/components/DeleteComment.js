import React, { Component } from 'react';
import * as api from './api';
import '../styling/DeleteComment.css';

class DeleteComment extends Component {
    render() {
        return (
            <div>
                <button onClick={this.delComment} className="button" >Delete Comment</button>
            </div>
        );
    }

    delComment = (event) => {
        event.preventDefault();
        api.deleteComment(this.props.id, this.props.comment_id)
        .then(() => {
            this.props.removeComment(this.props.comment);
        })
    }

}

export default DeleteComment;