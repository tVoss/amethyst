import axios from 'axios'

import StreamPost from './stream-post'

export default class StreamSubreddit {

    private url: string;
    private streamPosts: StreamPost[]

    constructor(sport: string) {
        this.url = `https://www.reddit.com/r/${sport}streams.json`;
    }

    getStreamPosts(refresh: boolean = false)  {
        if (!refresh && this.streamPosts) {
            console.log(this.streamPosts)
        }

        axios.get(this.url).then(res => {
            console.log(res)
        }).catch(err => {
            console.error(err)
        })

    }
}
