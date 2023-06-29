import { api } from "./config"

export const LoginApi = {
    login: async function (email, password) {
        const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
        const clientId = process.env.REACT_APP_CLIENT_ID;

        let bodyFormData = new FormData();
        bodyFormData.append("username", email);
        bodyFormData.append("password", password);
        bodyFormData.append("grant_type", "password");
        bodyFormData.append("client_secret", clientSecret);
        bodyFormData.append("client_id", clientId);
        bodyFormData.append("scope", "*");

        const response = await api.request({
            url: `oauth/token`,
            method: "POST",
            data: bodyFormData,

        })

        return response.data
    },
}

