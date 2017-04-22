import * as React from 'react'

import StreamSubreddit from '../core/stream-subreddit'
import StreamPost from '../core/stream-post'

export default class App extends React.Component<void, void> {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        // Here we test
        const sub: StreamSubreddit = new StreamSubreddit('mlb')
        sub.getStreamPosts();
    }

    render() {
        return <div></div>
    }

}
