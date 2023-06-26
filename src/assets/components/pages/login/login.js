import React from 'react';
import {LoginApi} from "../../../../helper/api/login";
import {useNavigate} from "react-router-dom";


const Login = () => {
    const navigate = useNavigate()

    function login() {
        const email = "test@kianvos.nl";
        const password = "password";
        LoginApi.login(email, password)
            .then((response) => {
                const token = response.access_token;
                //set JWT token in localstorage
                localStorage.setItem("token", token);
                navigate("/");
            })
            .catch(err => console.log(err));
    }

    login();
    return (
        <div>
            <p>Login</p>
        </div>
    );
}

export default Login;