import axios from "axios"
export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "/",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
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

api.interceptors.response.use(undefined, (error) => {
    return errorHandler(error)
})