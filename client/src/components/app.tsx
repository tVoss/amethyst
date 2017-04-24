import * as React from 'react'
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import SportListing from './sport-listing'

import StreamSubreddit from '../core/stream-subreddit'

import Logos from '../core/logos'

export default class App extends React.Component<void, void> {

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <AppBar
                        title="amethyst"
                        showMenuIconButton={false}
                        zDepth={0} />
                    <h1>NBA</h1>
                    <SportListing sport='nba' />
                    <h1>MLB</h1>
                    <SportListing sport='mlb' />
                    <h1>NFL</h1>
                    <SportListing sport='nfl' />
                </div>
            </MuiThemeProvider>
        );
    }
}
