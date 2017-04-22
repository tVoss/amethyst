import {RedditT3Data} from './models'

export default class StreamPost {

    private data: RedditT3Data;

    constructor(data: RedditT3Data) {
        this.data = data;
    }

    getTitle() {
        return this.data.title;
    }
}
