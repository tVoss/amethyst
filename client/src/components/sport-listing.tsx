import * as React from 'react'
import Paper from 'material-ui/Paper';

import StreamSubreddit from '../core/stream-subreddit'
import StreamPost from '../core/stream-post'

import GameListing from './game-listing'

interface Props {
    sub: StreamSubreddit
}

interface State {
    posts: StreamPost[]
}

export default class SportListing extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.props.sub.getStreamPosts().then(posts => {
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
            <Paper style={{magrin: '8px', padding: '8px'}}>
                {this.state.posts.map(this.renderPost)}
            </Paper>
        );
    }

    renderPost = (post: StreamPost) => {
        return (
            <GameListing
                key={post.getTitle()}
                post={post} />
        )
    }
}
