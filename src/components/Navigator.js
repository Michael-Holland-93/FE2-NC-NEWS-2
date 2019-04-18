import React, { Component } from 'react';
import { Link } from '@reach/router';
import Error from './Error';
import '../styling/Navigator.css';
import { Button } from 'react-bootstrap';

class Navigator extends Component {
    state = ({
        err: null
    })
    render() {
        const { err } = this.state;
        return (
            err ? <Error /> :
            <nav className="Navigator">
            <span><button className="button"><Link to="/" style={{display: "block", height: "100%"}}>Home</Link></button></span>
            <span><button className="button"><Link to="/topics" style={{display: "block", height: "100%"}}>Topics</Link></button></span>
            <span><button className="button"><Link to="/users" style={{display: "block", height: "100%"}}>Users</Link></button></span>
            {this.loggedIn()}
            </nav>
        );
    }

    loggedIn() {
        if (this.props.user !== '') {
            return (
                <span>
                <p>Logged in as {this.props.user}</p>
                <Button className="button" onClick={this.props.logout}>Logout</Button>
                </span>
            )
        }
    }

}

export default Navigator;