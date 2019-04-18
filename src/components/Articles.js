import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from './api';
import Votes from './Votes';
import Error from './Error';
import AddArticle from './AddArticle';
import '../styling/Articles.css';

class Articles extends Component {
    state = ({
        articles: [],
        err: null,
        page: 0,
        title: '',
        body: '',
        user_id: null,
        disable: false
    })
    render() {
        const { err } = this.state;
        return (
            err ? <Error /> :
            <div className="articles">
                <AddArticle addNewArticle={this.addNewArticle} articles={this.state.articles} page={this.state.page} topic={this.props.topic} title={this.state.title} body={this.state.body} user_id={this.props.user_id}  />
                <div>
                    {this.props.topic ? 
                        <h2>This is the list of all the articles related to {this.props.topic}</h2>
                        : 
                        <h2>This is the list of all the articles about each topic</h2>
                    } 
                    <ul className="bulletPoints" key="articlesList">
                        {this.state.articles.map((article) => {
                            return <li key={article.article_id}>
                            {article.title !== '' ? 
                            <>
                            <Link to={`/articles/${article.article_id}`}><h2>{article.title}</h2></Link>
                            <Votes type='articles' id={article.article_id} votes={article.votes}/>
                            </>
                            : 
                            null
                        }
                            </li>
                        })}
                    </ul>
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                    <button onClick={() => {this.handleClick(-1)}} disabled={this.state.page === 0} className="button">Previous page</button>
                    <button onClick={() => {this.handleClick(1)}} disabled={this.state.disable === true} className="button">Next page</button>
                    </form>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.fetchArticles(this.state.page);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.topic !== prevProps.topic) {
            this.fetchArticles(this.state.page);
        }
        if (this.state.page !== prevState.page) {
            this.fetchArticles(this.state.page);
        }
    }

    fetchArticles = (page) => {
        api.getArticles(this.props.topic, page)
        .then((articles) => {
            this.setState({ articles })
        })
        .catch(err => this.setState({ err }))
        this.disable();
    }

    handleClick = (increment) => {
        this.setState({ page: this.state.page + increment });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.fetchArticles(this.state.page);
        this.disable();
    }

    addNewArticle = (newArticle) => {
        this.setState((prevState) => ({
            articles: [newArticle, ...prevState.articles]
        }))
        this.fetchArticles(this.state.page);
        this.disable();
    }

    removeArticle = (filteredArticle) => {
        const filteredArticles = this.state.articles.filter((article) => {
            if (article.article_id !== filteredArticle.article_id) {
                return article;
            }
        })
        this.setState({ articles: filteredArticles });
        this.fetchArticles(this.state.page);
        this.disable();
    }

    disable = () => {
        api.getArticles(this.props.topic, this.state.page + 1)
        .then((articles) => {
            if (articles.length === 0) {
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

export default Articles;