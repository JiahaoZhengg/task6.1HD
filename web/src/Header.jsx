import React from "react";
import './Header.css';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom';


function Header() {
    return (
        <div className="header">
            <div className="deakin">
                <h1>DEV@Deakin</h1>
            </div>
            <div className="ui icon input">
                <input type="text" placeholder="Search..." />
                <i aria-hidden="true" class="search icon"></i>
            </div>
            <Link to='/Postpage'><button className="post1"> Post</button> </Link>
            {
                sessionStorage.getItem("userInfo") ?
                    <Link to='/myhome'><button>My Home</button></Link>
                    : <Link to='/login'><button className="loginButton">Login</button></Link>
            }
        </div>
    )
}

export default Header