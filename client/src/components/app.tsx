import * as React from 'react'
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import StreamSubreddit from '../core/stream-subreddit'
import StreamPost from '../core/stream-post'

interface State {
    streamPosts: StreamPost[]
}

export default class App extends React.Component<void, State> {

    constructor(props) {
        super(props)

        this.state = {
            streamPosts: []
        }
    }

    componentWillMount() {
        // Here we test
        const sub: StreamSubreddit = new StreamSubreddit('mlb')
        sub.getStreamPosts().then(posts => {
            this.setState({
                ...this.state,
                streamPosts: posts
            })
        });
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <AppBar
                        title="amethyst"
                        showMenuIconButton={false}
                        zDepth={0} />
                    <h1>hello</h1>
                    {this.state.streamPosts.map(p => {
                        return <p key={p.getTitle()}>
                            {p.getTitle()}
                        </p>
                    })}
                </div>
            </MuiThemeProvider>
        );
    }

}
