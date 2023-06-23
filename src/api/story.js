import { api } from "./config"

export const StoryApi = {
    get: async function (e) {
        const response = await api.request({
            url: `/stories`,
            method: "GET",
        })

        return response.data
    },
    getStory: async function (storyId) {
        const response = await api.request({
            url: `/story/${storyId}`,
            method: "GET",
        })

        return response.data
    },
}

