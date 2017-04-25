import Axios from 'axios'

import { RedditT1Data, RedditT3Data } from './models'

import StreamSubreddit from './stream-subreddit'
import StreamLink from './stream-link'

const MD_LINK = /\[.+\]\(.+\)/g

export default class StreamPost {

    // Raw post data
    private sub: StreamSubreddit;
    private data: RedditT3Data;

    // Home and Away Teams
    private home: string;
    private away: string;

    // Child stream links
    private streamLinks: StreamLink[]

    constructor(sub: StreamSubreddit, data: RedditT3Data) {
        this.sub = sub;
        this.data = data;

        this.streamLinks = null;

        const awayStart = sub.preamble.length;
        const awayEnd = data.title.indexOf(sub.at);
        const homeStart = awayEnd + sub.at.length + 2;
        const homeEnd = data.title.indexOf(data.title.match(sub.postamble)[0]) - 1;

        this.away = this.data.title.slice(awayStart, awayEnd);
        this.home = this.data.title.slice(homeStart, homeEnd);
    }

    getStreamLinks(refresh: boolean = false): Promise<StreamLink[]> {
        return new Promise((resolve, reject) => {
            if (!refresh && this.streamLinks) {
                resolve(this.streamLinks);
                return;
            }

            Axios.get(`${this.data.url.slice(0, -1)}.json`).then(res => {
                // Parse comments out of response
                const comments: RedditT1Data[] = res.data[1].data.children.map(c => c.data);

                const getCommentLinks = (comment: RedditT1Data) => {
                    // If there is a verified streams post pull links from there
                    const links: StreamLink[] = []

                    // Loop through matching regex
                    let result;
                    while(result = MD_LINK.exec(comments[0].body)) {
                        links.push(new StreamLink(result[0]))
                    }

                    return links;
                };

                if (comments[0].body.startsWith('**Verified Streamers**')) {
                    // If there is a verified streams post pull links from there
                    this.streamLinks = getCommentLinks(comments[0]);
                } else {
                    // Otherwise go through all comments (lol)
                    this.streamLinks = [];
                    for (let i = 0; i < comments.length; i++) {
                        this.streamLinks = this.streamLinks
                            .concat(getCommentLinks(comments[i]));
                    }
                }

                resolve(this.streamLinks);
            }).catch(err => {
                reject('Could not get links');
            })
        })
    }

    getTitle(): string {
        return this.data.title;
    }

    getHome(): string {
        return this.home;
    }

    getHomeLogo(): string {
        const keys = Object.keys(this.sub.logos).filter(k => k.includes(this.home));
        return this.sub.logos[keys[0]];
    }

    getAway(): string {
        return this.away;
    }

    getAwayLogo(): string {
        const keys = Object.keys(this.sub.logos).filter(k => k.includes(this.away));
        return this.sub.logos[keys[0]];
    }
}
