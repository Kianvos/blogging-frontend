import {decodeToken} from "react-jwt";

export const JWT = {
    isLoggedIn: function () {
        return localStorage.getItem("token") != null
    },

    decodeToken: function () {
        const token = localStorage.getItem("token");
        if (token === null){
            return false;
        }
        return decodeToken(token);
    },

    logout: function () {
        localStorage.removeItem("token");
    }
}

