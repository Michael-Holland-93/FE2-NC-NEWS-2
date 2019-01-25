import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Navigator from './components/Navigator';
import Articles from './components/Articles';
import Sidebar from './components/Sidebar';
import Authorisation from './components/Authorisation';
import { Link, Router } from '@reach/router';
import Votes from './components/Votes';
import Comments from './components/Comments';
import Error from './components/Error';
import Article from './components/Article';

class App extends Component {
  state = {
    user: ''
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Navigator user={this.state.user} logout={this.logout}/>
        <Authorisation user={this.state.user} setUser={this.setUser}>
          <Router className="articles">
            <Articles path="/" />
            <Articles path="/topics/:topic" />
            <Article path="/articles/:article_id" />
          </Router>
        </Authorisation>
        <Footer />
      </div>
    );
  }

  setUser = (username) => {
    this.setState({ user: username });
  }

  logout = () => {
      this.setState({ user: '' })
  }

}

export default App;
