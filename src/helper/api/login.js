import { api } from "./config"

export const LoginApi = {
    login: async function (email, password) {
        let bodyFormData = new FormData();
        bodyFormData.append("username", email);
        bodyFormData.append("password", password);
        bodyFormData.append("grant_type", "password");
        bodyFormData.append("client_secret", "atNtn97oIpbvZyO0XzYa8hWfKd3I6IQYY9xtV7MF");
        bodyFormData.append("client_id", "2");
        bodyFormData.append("scope", "*");

        const response = await api.request({
            url: `oauth/token`,
            method: "POST",
            data: bodyFormData,

        })

        return response.data
    },
}

