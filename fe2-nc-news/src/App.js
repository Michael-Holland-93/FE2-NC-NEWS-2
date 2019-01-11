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

class App extends Component {
  render() {
    return (
      <div className="App">
      {/* <Authorisation> */}
        <Header />
        <Navigator />
        <Router className="articles">
          <Articles path="/" >
            <Comments />
          </Articles>
          <Articles path="/topics/:topic" >
            <Comments />
          </Articles>
          <Articles path="/:article_id" >
            <Comments />
            <Votes />
          </Articles>
          <Error path = '/error'></Error>
        </Router>
        <Sidebar />
        <Footer />
      {/* </Authorisation> */}
      </div>
    );
  }
}

export default App;
