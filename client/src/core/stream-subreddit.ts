import Axios from 'axios'

import StreamPost from './stream-post'

import Logos from './logos'

export default class StreamSubreddit {

    // Url of the subreddit json
    readonly url: string;
    // Text that comes before teams in posts
    readonly preamble: string;
    // Text that divides teams in posts
    readonly at: string;
    // Text that comes after teams in posts
    readonly postamble: RegExp;
    // The logos for the teams of this sport
    readonly logos: { [team: string]: string }

    // Loaded posts
    private streamPosts: StreamPost[]

    constructor(name: string,
                preamble: string = 'Game Thread: ',
                at: string = ' @ ',
                postamble: RegExp = /\(/) {

        this.url = `https://www.reddit.com/r/${name}.json`;
        this.preamble = preamble;
        this.at = at;
        this.postamble = postamble;
        this.logos = Logos[name];

        this.streamPosts = null;
    }

    getStreamPosts(refresh: boolean = false): Promise<StreamPost[]>  {
        return new Promise((resolve, reject) => {

            // Return current posts if we aren't explicitly refreshing
            if (!refresh && this.streamPosts) {
                resolve(this.streamPosts);
                return;
            }

            // Load the posts
            Axios.get(this.url).then(res => {

                // Filter ones with the preamble and make new post objects
                this.streamPosts = res.data.data.children
                    .filter(t3 => {
                        return t3.data.title.includes(this.preamble)
                    })
                    .map(t3 => {
                        return new StreamPost(this, t3.data);
                });

                // Return the new posts
                resolve(this.streamPosts);
            }).catch(err => {
                // Something went wrong :/
                reject('Subreddit not reachable');
            })
        })
    }
}
