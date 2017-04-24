import Axios from 'axios'

import StreamPost from './stream-post'

export default class StreamSubreddit {

    private url: string;
    private streamPosts: StreamPost[]

    constructor(sport: string) {
        this.url = `https://www.reddit.com/r/${sport}streams.json`;
        this.streamPosts = null;
    }

    getStreamPosts(refresh: boolean = false): Promise<StreamPost[]>  {
        return new Promise((resolve, reject) => {
            if (!refresh && this.streamPosts) {
                resolve(this.streamPosts);
                return;
            }

            Axios.get(this.url).then(res => {

                this.streamPosts = res.data.data.children
                    .filter(t3 => {
                        return t3.data.title.includes('Game Thread:')
                    })
                    .map(t3 => {
                        return new StreamPost(t3.data);
                });

                resolve(this.streamPosts);
            }).catch(err => {
                reject('Subreddit not reachable');
            })
        })


    }
}
