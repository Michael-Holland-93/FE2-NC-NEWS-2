import React, { Component } from 'react';
import * as api from './api';
import '../styling/AddArticle.css';
import { Button } from 'react-bootstrap';

class AddArticle extends Component {
    state = {
        articles: [],
        err: null,
        page: 0,
        title: '',
        body: '',
        user_id: null
    }
    render() {
        return (
            this.props.topic ?
            <div>
                        <form >
                            <ul className="bulletPoints">
                                <li><label>Article Title</label>
                                <input type="text" id="title" onChange={this.setTitle} /></li>
                                <li><label>Article Body</label>
                                <input type="text" id="body" onChange={this.setBody} /></li>
                                <li><Button className="button" onClick={this.addArticle}>Add Article</Button></li>
                            </ul>
                        </form>
                        <br />
            </div> :
            null
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.title !== prevState.title && this.state.body !== prevState.body) {
            this.addArticle();
        } 
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

    fetchArticles = (page) => {
        api.getArticles(this.props.topic, page)
        .then((articles) => {
            this.setState({ articles })
        })
        .catch(err => this.setState({ err }))
    }

    addArticle = (event) => {
        event.preventDefault();
            api.postArticle(this.state.title, this.state.body, this.props.user_id, this.props.topic)
            .then((article) => {
                this.props.addNewArticle(article)
            });
    }

}

export default AddArticle;