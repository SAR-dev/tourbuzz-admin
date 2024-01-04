import axios from "axios";
import { CreateArticleType, CreateOrganizerType, CreateWriterType, UpdateArticleType, UpdateWriterType } from "../constants/types";

const api = axios.create();

api.interceptors.request.use(
    (config) => {
        config.baseURL = import.meta.env.VITE_API_URL;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)
export const getImages = ({
    pageNo,
    pageSize
}: {
    pageNo: number,
    pageSize: number
}): Promise<any> => {
    return api
        .get("/admin/images", {
            params: {
                page_no: pageNo,
                page_size: pageSize,
            }
        })
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

export const deleteImageById = ({ id }: { id: number }): Promise<any> => {
    return api
        .delete(`/admin/images/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
};

export const postImage = (file: Blob): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);

    return api
        .post("/admin/images", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

// Writers

export const getWriters = ({
    pageNo,
    pageSize
}: {
    pageNo: number,
    pageSize: number
}): Promise<any> => {
    return api
        .get("/admin/writers", {
            params: {
                page_no: pageNo,
                page_size: pageSize,
            }
        })
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

export const getWriterById = ({ id }: { id: number }): Promise<any> => {
    return api
        .get(`/admin/writers/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

export const postWriter = ({ ...props }: CreateWriterType): Promise<any> => {
    const data = { ...props }
    return api
        .post("/admin/writers", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

export const putWriter = ({ ...props }: UpdateWriterType): Promise<any> => {
    const data = { ...props }

    return api
        .put("/admin/writers", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

export const deleteWriterById = ({ id }: { id: number }): Promise<any> => {
    return api
        .delete(`/admin/writers/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            console.log(err)
            return { error: err || true };
        });
}

// Articles

export const getArticles = ({
    pageNo,
    pageSize
}: {
    pageNo: number,
    pageSize: number
}): Promise<any> => {
    return api
        .get("/admin/articles", {
            params: {
                page_no: pageNo,
                page_size: pageSize,
            }
        })
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

export const getArticleById = ({ id }: { id: number }): Promise<any> => {
    return api
        .get(`/admin/articles/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

export const postArticle = ({ ...props }: CreateArticleType): Promise<any> => {
    const data = { ...props }
    return api
        .post("/admin/articles", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

export const updateArticle = ({ ...props }: UpdateArticleType): Promise<any> => {
    const data = { ...props }
    return api
        .put("/admin/articles", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            console.log(err)
            return { error: err || true };
        });
}

export const deleteArticleById = ({ id }: { id: number }): Promise<any> => {
    return api
        .delete(`/admin/articles/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

// Enqueries

export const getEnquiries = ({
    pageNo,
    pageSize
}: {
    pageNo: number,
    pageSize: number
}): Promise<any> => {
    return api
        .get("/admin/enquiries", {
            params: {
                page_no: pageNo,
                page_size: pageSize,
            }
        })
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

export const answerEnquery = ({ answer, enquiries_id }: { answer: string, enquiries_id: number }): Promise<any> => {
    const data = { answer, enquiries_id }
    return api
        .put("/admin/enquiries", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

// Organizers

export const postOrganizer = ({ ...props }: CreateOrganizerType): Promise<any> => {
    const data = { ...props }
    return api
        .post("/admin/organizers", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

export const getOrganizers = ({
    pageNo,
    pageSize
}: {
    pageNo: number,
    pageSize: number
}): Promise<any> => {
    return api
        .get("/admin/organizers", {
            params: {
                page_no: pageNo,
                page_size: pageSize,
            }
        })
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}