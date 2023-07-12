import axios from "axios"
export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "/",
})

const errorHandler = (error) => {

    const statusCode = error.response?.status

    if (error.code === "ERR_CANCELED") {
        // notification.error({
        //     placement: "bottomRight",
        //     description: "API canceled!",
        // })
        return Promise.resolve()
    }

    // logging only errors that are not 401
    else if (statusCode && statusCode !== 401) {
        console.error(error)
    }

    return Promise.reject(error)
}

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(undefined, (error) => {
    return errorHandler(error)
})