import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Navigator from './components/Navigator';
import Articles from './components/Articles';
import Authorisation from './components/Authorisation';
import { Router } from '@reach/router';
import Article from './components/Article';
import Users from './components/Users';
import User from './components/User';
import Topics from './components/Topics';

class App extends Component {
  state = {
    user: '',
    user_id: null
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Navigator user={this.state.user} logout={this.logout}/>
        <Authorisation user={this.state.user} setUser={this.setUser} user_id={this.state.user_id}>
          <Router className="articles" >
            <Articles path="/" user_id={this.state.user_id}/>
            <Topics path="/topics" />
            <Articles path="/topics/:topic" user_id={this.state.user_id}/>
            <Article path="/articles/:article_id" user_id={this.state.user_id}/>
            <Users path="/users" />
            <User path="users/:username" />
          </Router>
        </Authorisation>
        <Footer />
      </div>
    );
  }

  setUser = (username, user_id) => {
    this.setState({ user: username, user_id });
  }

  logout = () => {
      this.setState({ user: '', user_id: null })
  }

}

export default App;
