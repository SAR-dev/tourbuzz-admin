import axios from "axios";
import { CreateArticleType, CreateHotelType, CreateOrganizerType, CreatePlaceType, CreateTourLogtype, CreateTourPackageType, CreateTourType, CreateWriterType, UpdateArticleType, UpdateHotelType, UpdateOrganizerType, UpdatePlaceType, UpdateWriterType } from "../types";
import { tokenKey } from "@src/store";

const api = axios.create();

api.interceptors.request.use(
    (config) => {
        try {
            const storedTokens = JSON.parse(localStorage.getItem(tokenKey) ?? "") || {};
            const { accessToken, adminToken } = storedTokens.state || {};

            if (accessToken) {
                config.headers.Authorization = `${accessToken}`;
            }

            if (adminToken) {
                config.headers["x-api-key"] = adminToken;
            }

            config.baseURL = import.meta.env.VITE_API_URL;
        } catch (error) {
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export const sendMagicLink = ({ email }: { email: string }): Promise<any> => {
    const data = { email }
    return api
        .post("/auth/magic-link", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

export const verifyToken = ({ magic_token, admin_key }: { magic_token: string, admin_key: string }): Promise<any> => {
    const data = { magic_token, admin_key }
    return api
        .post("/auth/admin-sign-in", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}


// Images

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

export const postImage = (file: Blob, title: string): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

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
    pageSize,
    name,
    email
}: {
    pageNo: number,
    pageSize: number,
    name?: string,
    email?: string
}): Promise<any> => {
    return api
        .get("/admin/writers", {
            params: {
                page_no: pageNo,
                page_size: pageSize,
                name: name ?? "",
                email: email ?? "",
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
    pageSize,
    name,
    email
}: {
    pageNo: number,
    pageSize: number,
    name?: string,
    email?: string
}): Promise<any> => {
    return api
        .get("/admin/organizers", {
            params: {
                page_no: pageNo,
                page_size: pageSize,
                name: name ?? "",
                email: email ?? "",
            }
        })
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

export const getOrganizerById = ({ id }: { id: number }): Promise<any> => {
    return api
        .get(`/admin/organizers/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

export const updateOrganizer = ({ ...props }: UpdateOrganizerType): Promise<any> => {
    const data = { ...props }
    return api
        .put("/admin/organizers", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            console.log(err)
            return { error: err || true };
        });
}

export const deleteOrganizerById = ({ id }: { id: number }): Promise<any> => {
    return api
        .delete(`/admin/organizers/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

// Districts

export const getDivisions = (): Promise<any> => {
    return api
        .get("/admin/divisions")
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

// Tour Types

export const getTourTypes = (): Promise<any> => {
    return api
        .get("/admin/tour-types")
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

// Hotels

export const postHotel = ({ ...props }: CreateHotelType): Promise<any> => {
    const data = { ...props }
    return api
        .post("/admin/hotels", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

export const getHotels = ({
    pageNo,
    pageSize,
    name
}: {
    pageNo: number,
    pageSize: number,
    name?: string
}): Promise<any> => {
    return api
        .get("/admin/hotels", {
            params: {
                page_no: pageNo,
                page_size: pageSize,
                name: name ?? ""
            }
        })
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

export const getHotelById = ({ id }: { id: number }): Promise<any> => {
    return api
        .get(`/admin/hotels/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

export const updateHotel = ({ ...props }: UpdateHotelType): Promise<any> => {
    const data = { ...props }
    return api
        .put("/admin/hotels", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            console.log(err)
            return { error: err || true };
        });
}

export const deleteHotelById = ({ id }: { id: number }): Promise<any> => {
    return api
        .delete(`/admin/hotels/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

// Places

export const postPlace = ({ ...props }: CreatePlaceType): Promise<any> => {
    const data = { ...props }
    return api
        .post("/admin/places", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

export const getPlaces = ({
    pageNo,
    pageSize,
    name
}: {
    pageNo: number,
    pageSize: number,
    name?: string
}): Promise<any> => {
    return api
        .get("/admin/places", {
            params: {
                page_no: pageNo,
                page_size: pageSize,
                name: name ?? ""
            }
        })
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

export const getTypesOfPlaces = (): Promise<any> => {
    return api
        .get("/admin/place-types")
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

export const getPlaceById = ({ id }: { id: number }): Promise<any> => {
    return api
        .get(`/admin/places/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

export const updatePlace = ({ ...props }: UpdatePlaceType): Promise<any> => {
    const data = { ...props }
    return api
        .put("/admin/places", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            console.log(err)
            return { error: err || true };
        });
}

export const deletePlaceById = ({ id }: { id: number }): Promise<any> => {
    return api
        .delete(`/admin/places/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

// Tours

export const postTourLog = ({ ...props }: CreateTourLogtype): Promise<any> => {
    const data = { ...props }
    return api
        .post("/admin/tour-logs", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

export const postTourPackage = ({ ...props }: CreateTourPackageType): Promise<any> => {
    const data = { ...props }
    return api
        .post("/admin/tour-packages", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

export const postTour = ({ ...props }: CreateTourType): Promise<any> => {
    const data = { ...props }
    return api
        .post("/admin/tours", data)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}

export const getTours = ({
    pageNo,
    pageSize
}: {
    pageNo: number,
    pageSize: number
}): Promise<any> => {
    return api
        .get("/admin/tours", {
            params: {
                page_no: pageNo,
                page_size: pageSize
            }
        })
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}


export const getTourById = ({ id }: { id: number }): Promise<any> => {
    return api
        .get(`/admin/tours/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            return { error: err || true };
        });
}