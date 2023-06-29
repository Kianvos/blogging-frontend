import {api} from "./config"

export const StoryApi = {
    get: async function (e) {
        const response = await api.request({
            url: `api/stories`,
            method: "GET",
        })

        return response.data
    },
    getStory: async function (storyId) {
        const response = await api.request({
            url: `api/story/${storyId}`,
            method: "GET",
        })

        return response.data
    },

    createStory: async function (title, description, img) {
        const data = {
            title: title,
            description: description,
            image: img
        }
        const response = await api.request({
            url: `api/story/create`,
            method: "POST",
            data: data
        })

        return response.data
    },

    editStory: async function (id, title, description, img) {
        const data = {
            title: title,
            description: description,
            image: img
        }
        const response = await api.request({
            url: `api/story/edit/${id}`,
            method: "PUT",
            data: data
        })

        return response.data
    },
    deleteStory: async function (id) {
        const response = await api.request({
            url: `api/story/delete/${id}`,
            method: "DELETE",
        })

        return response.data
    }
}

