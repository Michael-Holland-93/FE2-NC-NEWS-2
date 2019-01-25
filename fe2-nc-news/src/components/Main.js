import React, { Component } from 'react';

class Main extends Component {
    render() {
        return (
            <div>
                    <h2>{this.props.article.title}</h2>
                    <ul>
                        <li>author: {this.props.article.author}</li>
                        <li>article id: {this.props.article.article_id}</li>
                        <li>topic: {this.props.article.topic}</li>
                        <li>body: {this.props.article.body}</li>
                        <li>created at: {this.props.article.created_at}</li>
                        <li>comment count: {this.props.article.comment_count}</li>
                        <li>votes: {this.props.article.votes}</li>
                    </ul>
            </div>
        );
    }
}

export default Main;