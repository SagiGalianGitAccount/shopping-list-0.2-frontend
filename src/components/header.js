import React, { Component } from 'react';
import '../static/css/header.css';
import { VscHome } from "react-icons/vsc";
import { IoCallOutline } from "react-icons/io5";
import { IoLogInOutline } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
function Header() {
    return (
        <div className='header-container'>
            <ul>
                <li>
                <Link className='header-link' to='/signin'><IoLogInOutline className='icon' />  כניסה לרשימה קיימת</Link>
                </li>
                <li>
                <Link className='header-link' to='/register'><IoCreateOutline className='icon' />  יצירת רשימה חדשה</Link>
                </li>
            </ul>

        </div>
    );
}

export default Header;