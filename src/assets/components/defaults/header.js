import React, {useEffect, useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {RiCloseLine, RiMenuLine} from "react-icons/ri";

import {JWT} from "../../../helper/jwt";
import './defaults.css';

const Header = () => {
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

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <NavLink onClick={closeMenu} to="/">Blogging</NavLink>
            </div>
            <div className={`navbar-menu ${menuOpen ? 'is-active' : ''}`}>
                <ul>
                    <li>
                        <NavLink onClick={closeMenu} to="/post">Post</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={closeMenu} to="/test">Test</NavLink>
                    </li>
                    {
                        loggedIn ?
                            <li>
                                <button onClick={HandleLogout}>Uitloggen</button>
                            </li>
                            : null
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
