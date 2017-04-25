import * as React from 'react'
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import SportListing from './sport-listing'

import StreamSubreddit from '../core/stream-subreddit'

import Logos from '../core/logos'

export default class App extends React.Component<void, void> {

    render() {

        const nba = new StreamSubreddit('nbastreams');
        const mlb = new StreamSubreddit('mlbstreams', 'Game Thread: ', ' at ', /\d/);

        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div style={{backgroundColor: '#eee'}}>
                    <AppBar
                        title="amethyst"
                        showMenuIconButton={false}
                        zDepth={0} />
                        <h1>NBA</h1>
                        <SportListing sub={nba} />
                        <h1>MLB</h1>
                        <SportListing sub={mlb} />
                </div>
            </MuiThemeProvider>
        );
    }
}
