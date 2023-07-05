import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className={"footer"}>
            Copyright © {currentYear} blog.kianvos.nl
        </div>
    );
}

export default Footer;