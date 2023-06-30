import React, {useState} from 'react';
import {LoginApi} from "../../../../helper/api/login";
import {useNavigate} from "react-router-dom";

import './login.css';

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        login(email, password)
    }

    function login(email, password) {
        LoginApi.login(email, password)
            .then((response) => {
                const token = response.access_token;
                //set JWT token in localstorage
                localStorage.setItem("token", token);
                navigate("/");
            })
            .catch(err => {
                console.error(err)
                setError(true);
            });
    }
    return (
        <div className={"wrapper"}>
            {error ?
                <div className={"error-message"}>
                    <p>Je wachtwoord komt niet overeen met je email.</p>
                </div>
                : null
            }
            <div className="form">
                <p>Je kan alleen inloggen als je een account hebt.</p>
                <form onSubmit={handleSubmit} className="login-form">
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    <button className={"form-button"}>login</button>
                </form>
            </div>
        </div>

    );
}

export default Login;