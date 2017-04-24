export default class StreamLink {

    private title: string;
    private url: string;

    constructor(mdLink: string) {
        this.title = /\[.+\]/.exec(mdLink)[0].slice(1, -1);
        this.url = /\(.+\)/.exec(mdLink)[0].slice(1, -1);
    }

    getTitle() {
        return this.title;
    }

    getUrl() {
        return this.url;
    }
}
