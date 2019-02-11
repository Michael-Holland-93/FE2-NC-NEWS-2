import React, { Component } from 'react';
import * as api from './api';

class Votes extends Component {
    state = {
        voteChange: 0
    }
    render() {
        return (
            <div>
                <section>
                    <div>
                    {this.props.type === 'comments' ? 
                    <p>Votes: {this.props.comment_votes + this.state.voteChange}</p>
                    : <p>Votes: {this.props.votes + this.state.voteChange}</p>}
                    </div>
                    <button onClick={() => this.vote(1)} disabled={this.state.voteChange === 1} className="button">Vote Up</button>
                    <button onClick={() => this.vote(-1)} disabled={this.state.voteChange === -1} className="button">Vote Down</button>
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