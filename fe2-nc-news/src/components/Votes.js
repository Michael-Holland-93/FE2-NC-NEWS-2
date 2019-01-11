import React, { Component } from 'react';
import * as api from './api';

class Votes extends Component {
    state = {
        votes: 0,
        voteChange: 0
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <section>
                    <button onClick={this.vote(1)} disabled={this.state.voteChange === 1}>Up</button>
                    <p>Votes: {this.state.votes}</p>
                    <button onClick={this.vote(-1)} disabled={this.state.voteChange === -1}>Down</button>
                </section>
            </div>
        );
    }

    vote(increment) {
        this.setState({ voteChange: this.state.voteChange + increment });
    }

    componentDidMount() {
        api.getCurrentVotes(this.props.article).then(votes => {
          this.setState({ voteChange: votes });
        });
      }



}

export default Votes;