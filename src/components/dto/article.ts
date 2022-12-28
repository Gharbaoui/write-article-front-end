export interface    BasicArticle {
    id:number;
    title:string;
    idea: string;
    logo:string;
    release_time:number;
}

interface np{
    prv_article_id: number;
    next_article_id: number;
}

interface preq{
    req_url:string;
    req_title:string;
    is_local_article:boolean;
}

interface eximg{
    path: string;
    is_local: boolean;
}

interface codesnipest {
    source_code: string;
    language:string;
}

interface exp {
    explain_img: eximg;
    explain_txt: string;
    code_snipest: codesnipest;
}

export interface    explained{
    title:string;
    idea:string;
    preqs: Array<preq>;
    next_prev_article: np;
    explained: Array<exp>;
    conclusion: string;
}