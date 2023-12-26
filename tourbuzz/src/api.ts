import axios from "axios";

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
            return { data: res.data.data };
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

interface PostWriterType {
    images_id: number, 
    email: string, 
    name: string, 
    username: string, 
    about: string
}
export const postWriter = ({ ...props }: PostWriterType): Promise<any> => {
    const data = { ...props}

    return api
        .post("/admin/writers", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            console.log(err)
            return { error: err || true };
        });
}

