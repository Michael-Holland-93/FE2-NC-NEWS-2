import React, { Component } from 'react';
import * as api from './api';
import { Button } from 'react-bootstrap';
import '../styling/Votes.css';

class Votes extends Component {
    state = {
        voteChange: 0
    }
    render() {
        return (
            <div className="outervotes">
                <section>
                    <div className="votes">
                    {this.props.type === 'comments' ? 
                    <p className="text">Votes: {this.props.comment_votes + this.state.voteChange}</p>
                    : <p className="text">Votes: {this.props.votes + this.state.voteChange}</p>}
                    </div>
                    <Button className="button" onClick={() => this.vote(1)} disabled={this.state.voteChange === 1}>Vote Up</Button>
                    <Button className="button" onClick={() => this.vote(-1)} disabled={this.state.voteChange === -1}>Vote Down</Button>
                </section>
            </div>
        );
    }

    vote = (increment) => {
        if (this.props.type === 'articles') {
            const { id } = this.props;
        api.updateArticleVotes(id, increment);
        this.setState({ voteChange: this.state.voteChange + increment });
        } else if (this.props.type === 'comments') {
            const { id, comment_id } = this.props;
        api.updateCommentVotes(id, comment_id, increment);
        this.setState({ voteChange: this.state.voteChange + increment });
        }
    }

}

export default Votes;