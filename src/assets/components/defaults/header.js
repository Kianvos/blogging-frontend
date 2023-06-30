import React, {useEffect, useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {RiCloseLine, RiMenuLine} from "react-icons/ri";

import {JWT} from "../../../helper/jwt";
import './defaults.css';
import {FaHome} from "react-icons/fa";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(JWT.isLoggedIn());

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    }

    useEffect(() => {
        setLoggedIn(JWT.isLoggedIn());
    }, [location]);

    const HandleLogout = () => {
        JWT.logout()
        window.location.href = "/"
    }

    const HandleLogin = () => {
        navigate('/login');
        setMenuOpen(false);
    }

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <NavLink className={"brand-name"} onClick={closeMenu} to="/"><FaHome fontSize={26}/> Blogging</NavLink>
            </div>
            <div className={`navbar-menu ${menuOpen ? 'is-active' : ''}`}>
                <ul>
                    <li>
                        <NavLink onClick={closeMenu} to="/story/new">Nieuwe story</NavLink>
                    </li>
                    {
                        loggedIn ?
                            <li>
                                <button className={"log-in-out-button"} type={"button"} onClick={HandleLogout}>Uitloggen</button>
                            </li>
                            :
                            <li>
                                <button className={"log-in-out-button"} type={"button"} onClick={HandleLogin}>Inloggen</button>
                            </li>
                    }
                </ul>
            </div>
            <button className="hamburger" onClick={toggleMenu}>
                {menuOpen ? (
                    <RiCloseLine color={"black"} fontSize={20}/>
                ) : (
                    <RiMenuLine color={"black"} fontSize={20}/>
                )}
            </button>
        </nav>
    );
}

export default Header;
