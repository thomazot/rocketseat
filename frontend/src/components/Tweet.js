import React, { Component } from 'react';
import like from '../like.svg';
import './Tweet.css';
import api from '../services/api';

class Tweet extends Component {
    handleLike = async (evt) => {
        const { _id } = this.props.tweet;
        await api.post(`likes/${ _id }`);
    };
    render() {
        const { tweet } = this.props;

        return <li className="tweet">
            <strong>{ tweet.author }</strong>
            <p>{ tweet.content }</p>
            <button 
                onClick={ this.handleLike }
                type="button">
                <img src={ like } alt="Like" />
                { tweet.likes }
            </button>
        </li>;
    }
}

export default Tweet;