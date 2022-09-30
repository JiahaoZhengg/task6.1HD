import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
import { db } from "./utils/firebase.js";

import './Sign.css';

const User = collection(db, "User");

function Sign() {
    const history = useNavigate();

    const [contact, setContact] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
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

    const submit = async (event) => {
        event.preventDefault();
        if (contact.password !== contact.confirmPassword) {
            alert('passwords do not match!')
            return;
        }
        try {
            addDoc(User, {
                username: contact.displayName,
                email: contact.email,
                password: contact.password,
                message: []
            }).then(result => {
                // sessionStorage.setItem("userInfo", {
                //     username: contact.displayName,
                //     email: contact.email,
                //     password: contact.password,
                // });
                alert("registry success!");
                history("/login");
            }).catch(error => {
                console.log(error);
                alert("registry fail!");
            })
        }
        catch (error) {
            alert('error in creating user : invaild email or email exits', error.message);
        }
    }

    return (
        <div className="sign2">
            <h1>Create a DEV@Deakin Account</h1>
            <h3 style={{ float: 'left', width: "30%", margin: "0px", marginBottom: "25px" }} >Name*</h3>
            <input type="text" className="name" name="displayName" value={contact.displayName} onChange={handleChange}></input>
            <h3 style={{ float: 'left', width: "30%", margin: "0px", marginBottom: "25px" }} >Email*</h3>
            <input type="text" className="email3" name="email" value={contact.email} onChange={handleChange}></input>
            <h3 style={{ float: 'left', width: "30%", margin: "0px", marginBottom: "25px" }}>Password*</h3>
            <input type="password" className="password3" name="password" value={contact.password} onChange={handleChange}></input>
            <h3 style={{ float: 'left', width: "30%", margin: "0px", marginBottom: "25px" }}>Confirmed password*</h3>
            <input type="password" className="password4" name="confirmPassword" value={contact.confirmPassword} onChange={handleChange}></input>
            <button className="create" style={{ width: "100%", marginTop: "20px" }} onClick={submit} type="primary">
                Create
            </button>
        </div>
    )
}

export default Sign