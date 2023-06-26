import { api } from "./config"

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
}

