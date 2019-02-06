import React, { Component } from 'react';
import Tweet from '../components/Tweet';
import twitterLogo from '../twitter.svg';
import api from '../services/api';
import io from '../services/io';
import './Timeline.css';

class Timeline extends Component {
    state = {
        tweets: [],
        newTweet: ""
    };
    
    handleNewTweet = async (evt) => {
        if( evt.keyCode !== 13) return;
        const content = this.state.newTweet;
        const author = localStorage.getItem('@GoTwitter:username');

        await api.post("tweets", { content, author });

        this.setState({ newTweet: "" });
        
    }

    async componentDidMount() {
        const resp = await api.get('tweets');
        this.setState({ tweets: resp.data });
        this.subscribeToEvents();
    }

    subscribeToEvents = () => {
        io.on("tweet", data => this.setState({ tweets: [data, ...this.state.tweets] }));
        io.on("like", data => this.setState({ tweets: this.state.tweets.map((tweet) => tweet._id === data._id ? data : tweet) }));
    }

    render() {
        return <div className="timeline-wrapper">
            <img height={ 24 } src={ twitterLogo } alt="GoTwitter"/>
            <form>
                <textarea
                    value={ this.state.newTweet }
                    onChange={ (evt) => this.setState({ newTweet: evt.target.value }) }
                    onKeyDown={ this.handleNewTweet }
                    placeholder="O que está acontecendo?" />
            </form>
            <ul className="tweet-list">
                { this.state.tweets.map((tweet) => <Tweet key={ tweet._id } tweet={ tweet } />) }
            </ul>
        </div>
    }
}

export default Timeline;