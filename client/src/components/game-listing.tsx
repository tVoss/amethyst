import * as React from 'react'

import Paper from 'material-ui/Paper';

import StreamLink from '../core/stream-link'
import StreamPost from '../core/stream-post'

interface State {
    links: StreamLink[]
}

interface Props {
    post: StreamPost
}

export default class GameListing extends React.Component<Props, State> {

    private logos: [string, string];

    constructor(props: Props) {
        super(props)

        props.post.getStreamLinks().then(links => {
            this.setState({
                ...this.state,
                links
            })
        })

        this.state = {
            links: []
        }
    }

    render() {
        return (
            <Paper style={{verticalAlign: 'top', width: '400px', display: 'inline-block', margin: '8px', padding:'8px'}}>
                <img src={this.props.post.getAwayLogo()} />
                @
                <img src={this.props.post.getHomeLogo()} />
                {this.state.links.map(this.renderLink)}
            </Paper>
        )
    }

    renderLink(link: StreamLink, index: number) {
        return (
            <div key={index}>
                <a href={link.getUrl()}>
                    {link.getTitle()}
                </a>
                <hr/>
            </div>
        )
    }
}
