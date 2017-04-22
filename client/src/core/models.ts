export interface RedditNode {
    kind: "Listing" | "t1" | "t3";
    data: RedditListingData | RedditT1Data | RedditT3Data;
}

export interface RedditListingData {
    modhash: string;
    children: RedditNode[];
    after: any;
    before: any;
}

export interface RedditT1Data {
    subreddit_id: string;
    banned_by: any;
    removal_reason: any;
    link_id: string;
    likes: any;
    replies: string;
    user_reports: any[];
    saved: boolean;
    id: string;
    gilded: number;
    archived: boolean;
    score: number;
    report_reasons: any;
    author: string;
    parent_id: string;
    subreddit_name_prefixed: string;
    approved_by: any;
    controversiality: number;
    body: string;
    edited: boolean;
    author_flair_css_class: any;
    downs: number;
    body_html: string;
    stickied: boolean;
    subreddit: string;
    score_hidden: boolean;
    subreddit_type: string;
    name: string;
    created: number;
    author_flair_text: string;
    created_utc: number;
    ups: number;
    depth: number;
    mod_reports: any[]
    num_reports: any;
    distinguished: any;
}

export interface RedditT3Data {
    contest_mode: boolean;
    banned_by: any;
    media_embed: any;
    subreddit: string;
    selftext_html: string;
    selftext: string;
    likes: any;
    suggested_sort: string;
    user_reports: any[];
    secure_media: any;
    link_flair_text: any;
    id: string;
    gilded: number;
    secure_media_embed: any;
    clicked: boolean;
    score: number;
    report_reasons: any;
    author: string;
    saved: boolean;
    mod_reports: any[];
    name: string;
    subreddit_name_prefixed: string;
    approved_by: any;
    over_18: boolean;
    domain: string;
    hidden: boolean;
    thumbnail: string;
    subreddit_id: string;
    edited: number;
    link_flair_css_class: any;
    author_flair_css_class: any;
    downs: number;
    brand_safe: boolean;
    archived: boolean;
    removal_reason: any;
    is_self: boolean;
    hide_score: boolean;
    spoiler: boolean;
    permalink: string;
    num_reports: any;
    locked: boolean;
    stickied: boolean;
    created: number;
    url: string;
    author_flair_text: string;
    title: string;
    created_utc: number;
    distinguished: any;
    media: any;
    num_comments: number;
    visited: false;
    subreddit_type: string;
    ups: number
}
