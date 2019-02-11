import React, { Component } from 'react';
import * as api from './api';
import { navigate } from '@reach/router';

class DeleteArticle extends Component {
    render() {
        return (
            <div>
                <br />
                <button onClick={this.delArticle} className="button" >DeleteArticle</button>
            </div>
        );
    }

    delArticle = (event) => {
        event.preventDefault();
        api.deleteArticle(this.props.id)
        navigate(`/`);
    }

}

export default DeleteArticle;