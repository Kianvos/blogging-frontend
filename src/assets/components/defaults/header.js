import React, {useState} from 'react';
import {NavLink} from "react-router-dom";

import './defaults.css';
import {RiCloseLine, RiMenuLine} from "react-icons/ri";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
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
                </ul>
            </div>
            <button className="hamburger" onClick={toggleMenu}>
                {menuOpen ? (
                    <RiCloseLine color={"black"} fontSize={20}/>
                ) : (
                    <RiMenuLine color={"black"} fontSize={20} />
                )}
            </button>
        </nav>
    );
}

export default Header;
