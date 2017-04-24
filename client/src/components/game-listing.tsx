import * as React from 'react'

import StreamLink from '../core/stream-link'
import StreamPost from '../core/stream-post'

import Logos from '../core/logos'

interface State {
    links: StreamLink[]
}

interface Props {
    sport: string
    post: StreamPost
}

export default class GameListing extends React.Component<Props, State> {

    private logos: [string, string];

    constructor(props: Props) {
        super(props)

        this.logos = Logos[props.sport];

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
            <div>
                <img src={this.logos[this.props.post.getAway()]} />
                @
                <img src={this.logos[this.props.post.getHome()]} />
                {this.state.links.map(this.renderLink)}
            </div>
        )
    }

    renderLink(link: StreamLink) {
        return (
            <div key={link.getTitle()}>
                <a href={link.getUrl()}>
                    {link.getTitle()}
                </a>
                <hr/>
            </div>
        )
    }
}
