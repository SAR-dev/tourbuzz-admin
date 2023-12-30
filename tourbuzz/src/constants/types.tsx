export interface ImageType {
    id: number;
    title: string;
    source_url: string;
    thumbnail_url: string;
    optimized_url: string;
    created_at: string;
    updated_at: string;
}

export interface WriterType {
    id: number;
    images_id: number;
    email: string;
    name: string;
    username: string;
    about: string;
    phone_no: string;
    website: string;
    created_at: string;
    updated_at: string;
    avatar: ImageType;
}

export interface ArticleType {
    id: number
    writers_id: number
    title: string
    slug: string
    subtitle: string
    summary: string
    md_desc: string
    image_ids: string
    created_at: string
    updated_at: string
    writer: WriterType
    images: ImageType[]
}

export interface CreateWriterType {
    images_id: number,
    email: string,
    name: string,
    username: string,
    about: string
    phone_no: string
    website: string
}

export interface CreateArticleType {
    title: string,
    slug: string,
    subtitle: string,
    summary: string,
    md_desc: string,
    image_ids: number[],
    writers_id: number
}

export interface UpdateWriterType {
    writers_id: number,
    images_id: number,
    email: string,
    name: string,
    username: string,
    about: string,
    phone_no: string
    website: string
}

export interface UpdateArticleType {
    articles_id: number,
    title: string,
    slug: string,
    subtitle: string,
    summary: string,
    md_desc: string,
    image_ids: number[],
    writers_id: number
}

export interface ParsedErrorMessageProps {
    status?: number;
    message: string;
}

export interface RawErrorMessageProps {
    message: string;
    name: string;
    config: Config;
    code: string;
    response?: Response;
}

interface Config {
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
    headers: Headers;
    baseURL: string;
    method: string;
    url: string;
    data: string;
}

interface Response {
    data: Data;
}

interface Data {
    error: string;
    message: string;
    status: number;
    timestamp: string;
    trace: string;
}


export function parseErrorMessage(err: RawErrorMessageProps): ParsedErrorMessageProps {
    const res: ParsedErrorMessageProps = { status: 400, message: "" };
    if (err.response) {
        res.status = err.response.data.status
        res.message = err.response.data.message
    } else {
        res.message = err.message
    }
    return res;
}