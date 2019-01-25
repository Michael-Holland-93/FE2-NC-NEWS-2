import React, { Component } from 'react';
import { Link } from '@reach/router';

class Error extends Component {
    render() {
        return (
            <div>
                <p>An error occured</p>
                <Link to="/" >Home</Link>
            </div>
        );
    }

}

export default Error;