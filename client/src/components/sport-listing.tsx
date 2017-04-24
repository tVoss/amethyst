import * as React from 'react'

import StreamSubreddit from '../core/stream-subreddit'
import StreamPost from '../core/stream-post'

import GameListing from './game-listing'

interface Props {
    sport: string
}

interface State {
    posts: StreamPost[]
}

export default class SportListing extends React.Component<Props, State> {

    private sub: StreamSubreddit;

    constructor(props: Props) {
        super(props);

        this.sub = new StreamSubreddit(props.sport);

        this.sub.getStreamPosts().then(posts => {
            this.setState({
                ...this.state,
                posts
            });
        });

        this.state = {
            posts: []
        };
    }

    render() {
        return (
            <div>
                {this.state.posts.map(this.renderPost)}
            </div>
        );
    }

    renderPost = (post: StreamPost) => {
        return (
            <GameListing
                key={post.getTitle()}
                sport={this.props.sport}
                post={post} />
        )
    }
}
