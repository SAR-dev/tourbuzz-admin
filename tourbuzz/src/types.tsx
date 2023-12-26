export interface ImageType {
    id: number;
    title: string;
    source_url: string;
    thumbnail_url: string;
    optimized_url: string;
    created_at: Date;
    updated_at: Date;
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