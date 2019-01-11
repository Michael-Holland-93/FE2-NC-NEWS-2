import React, { Component } from 'react';
import * as api from './api';

class Comments extends Component {
    state = {
        comments: []
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <ul>
                    {this.state.comments.map((comment) => {
                        return <li>{comment}</li>
                    })}
                </ul>
            </div>
        );
    }

    getComments() {
        api.getCommentsByArticleId(this.props.article).then((comments) => {
            this.setState({
                comments
            })
        })
    }

    componentDidMount() {
        this.getComments();
    }

}

export default Comments;