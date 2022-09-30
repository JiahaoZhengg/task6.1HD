import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where, } from "firebase/firestore";
import { db } from "./utils/firebase.js";

import './login.css';

const User = collection(db, "User");

function Login() {
    const history = useNavigate();
    const login = async (event) => {
        event.preventDefault();
        const q = query(User, where("email", "==", contact.email));
        getDocs(q).then(result => {
            let userInfo = result.docs;
            if (userInfo.length) {
                let id = userInfo[0].id;
                userInfo = userInfo[0]._document.data.value.mapValue.fields
                console.log(userInfo);
                if (userInfo.password.stringValue === contact.password) {
                    sessionStorage.setItem("userInfo", JSON.stringify({
                        id: id,
                        username: userInfo.username.stringValue,
                        email: userInfo.email.stringValue,
                        password: userInfo.password.stringValue,
                    }));
                    alert("login success!");
                    history("/");
                } else {
                    alert("login error!");
                }
            }
        }).catch(error => {
            console.log(error);
            alert("login fail!");
        })
    }

    const [contact, setContact] = useState({
        email: '',
        password: '',
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setContact((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    return (
        <div className="login">
            <Link to='/Sign'><button className="signup">Sign Up</button></Link>
            <h2 style={{ float: "left" }} >Your email</h2>
            <input type="text" className="email2" name="email" value={contact.email} onChange={handleChange}></input>
            <h2 style={{ float: "left" }}>Your password</h2>
            <input type="password" className="password2" name="password" value={contact.password} onChange={handleChange}></input>
            <button className="login2" onClick={login}>Login</button>
        </div>
    )
}

export default Login