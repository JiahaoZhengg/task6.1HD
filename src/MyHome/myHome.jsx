import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../utils/firebase.js";
import { getDoc, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import "./myHome.css";

let flag = 1;

function MyHome() {
    const history = useNavigate();

    const [message, setMessage] = useState([]);
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    useEffect(() => {
        if (flag) {
            const docRef = doc(db, "User", userInfo.id);
            getDoc(docRef).then(result => {
                const message = [];
                let data = result.data();
                data.message.forEach(item => {
                    let obj = JSON.parse(item);
                    if (obj.status === "1") {
                        message.push(obj);
                    }
                })
                flag = 0;
                setMessage(message);
            }).catch(error => { });
        }
    });

    function detail(item) {
        console.log(item);
        const washingtonRef = doc(db, "User", userInfo.id);

        updateDoc(washingtonRef, {
            message: arrayUnion(JSON.stringify({
                time: item.time,
                video: item.video,
                status: 0
            }))
        }).then(() => {
            updateDoc(washingtonRef, {
                message: arrayRemove(JSON.stringify(item))
            })
        }).then(() => {
            history({
                pathname: `/detail/${item.time}/${item.video}`,
            })
        }).catch(error => {
            console.log(error);
        })
    }

    function logout(){
        sessionStorage.clear();
        alert("The logout is success！");
        history("/")
    }
    
    return (
        <div className="my-home">
            <div className="nav">
                <Link to='/'><span>Home</span></Link>
                <Link to='/findQuestion'><span>find question</span></Link>
                <Link to='/tutorial'><span>tutorial</span></Link>
            </div>
            <div className="userInfo">
                <h3>个人信息</h3>
                {
                    ["username", "email"].map(info => {
                        return <div>{info}: {userInfo[info]}</div>;
                    })
                }
                <button onClick={() => { logout() }}>log out</button>
            </div>

            <div className="myMessage">
                <h3>System Message</h3>
                {
                    message.map(item => {
                        return <div className="messageItem" onClick={() => { detail(item) }}>
                            <span>time: {(new Date(Number(item.time))).toString()}</span>
                            <span>type: good</span>
                            <span style={{ color: "green" }}>new message!</span>
                        </div>;
                    })
                }
            </div>
        </div>
    );
}

export default MyHome