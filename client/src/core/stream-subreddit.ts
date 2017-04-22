import axios from 'axios'

import StreamPost from './stream-post'

export default class StreamSubreddit {

    private url: string;
    private streamPosts: StreamPost[]

    constructor(sport: string) {
        this.url = `https://www.reddit.com/r/${sport}streams.json`;
    }

    getStreamPosts(refresh: boolean = false): Promise<StreamPost[]>  {
        return new Promise((resolve, reject) => {
            if (!refresh && this.streamPosts) {
                resolve(this.streamPosts);
            }

            axios.get(this.url).then(res => {

                this.streamPosts = res.data.data.children
                    .filter(t1 => {
                        return t1.data.title.includes('Game Thread:')
                    })
                    .map(t1 => {
                        return new StreamPost(t1.data);
                });

                resolve(this.streamPosts);
            }).catch(err => {
                reject('Subreddit not reachable');
            })
        })


    }
}
