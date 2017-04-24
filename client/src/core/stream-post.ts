import Axios from 'axios'

import { RedditT1Data, RedditT3Data } from './models'
import StreamLink from './stream-link'

const mdLink = /\[.+\]\(.+\)/g

export default class StreamPost {

    // Raw post data
    private data: RedditT3Data;

    // Home and Away Teams
    private home: string;
    private away: string;

    // Child stream links
    private streamLinks: StreamLink[]

    constructor(data: RedditT3Data) {
        this.data = data;
        this.streamLinks = null;

        const awayStart = "Game Thread: ".length;
        const awayEnd = data.title.indexOf('@') - 1;
        const homeStart = awayEnd + 3;
        const homeEnd = data.title.indexOf('(') - 1;

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

                if (comments[0].body.startsWith('**Verified Streamers**')) {
                    // If there is a verified streams post pull links from there
                    const streamLinks = []

                    // Loop through matching regex
                    let result;
                    while(result = mdLink.exec(comments[0].body)) {
                        streamLinks.push(new StreamLink(result[0]))
                    }

                    this.streamLinks = streamLinks;
                    resolve(this.streamLinks);
                } else {
                    // TODO pull links from comments
                    reject('No verified streamers post')
                }
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

    getAway(): string {
        return this.away;
    }
}
