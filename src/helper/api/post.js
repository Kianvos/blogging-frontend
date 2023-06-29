import {api} from "./config"

export const PostApi = {
    getPost: async function (storyId) {
        const response = await api.request({
            url: `api/post/${storyId}`,
            method: "GET",
        })

        return response.data
    },

    createPost: async function (storyId, title, description, img) {
        const data = {
            title: title,
            description: description,
            images: img
        }
        const response = await api.request({
            url: `api/post/create/${storyId}`,
            method: "POST",
            data: data
        })

        return response.data
    },

    editPost: async function (id, title, description, img) {
        const data = {
            title: title,
            description: description,
            image: img
        }
        const response = await api.request({
            url: `api/post/edit/${id}`,
            method: "PUT",
            data: data
        })

        return response.data
    },
    deletePost: async function (id) {
        const response = await api.request({
            url: `api/post/delete/${id}`,
            method: "DELETE",
        })

        return response.data
    }
}

