import React, { useState } from "react";
import { db } from "./utils/firebase.js";
import { collection, addDoc } from "firebase/firestore";

import "./Question.css";

const Q_A = collection(db, "Q_A");

function Question() {
    const [title, setTitle] = useState("");
    const [describe, setDescribe] = useState("");
    const [tags, setTags] = useState([]);

    function getDate() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return `${year}-${month > 9 ? month : "0" + month}-${day > 9 ? day : "0" + day}`;
    }

    const postQuestion = () => {
        addDoc(Q_A, {
            type: 0,
            title,
            describe,
            tags,
            date: getDate()
        }).then(result => {
            console.log(result);
            setTitle("");
            setDescribe("");
            setTags([]);
            alert("post question success!");
        }).catch(error => {
            console.log(error);
            alert("post question fail!");
        })
    }

    return (
        <div>
            <div className="t1">
                <h4>Title:</h4>
                <input value={title} onChange={e => setTitle(e.target.value)} className="Title" placeholder="Start your question with how, what,why,etc" />
            </div>
            <div className="t2">
                <h4 style={{ float: "left" }}>Describe your problem</h4>
                <textarea value={describe} onChange={e => setDescribe(e.target.value)} className="problem"></textarea>
                <div className="t3">
                    <h4>Tags:</h4>
                    <input value={tags.join(",")} onChange={e => setTags(e.target.value.split(","))} className="Title" placeholder="Please add up to 3 tags describe what your question is about e.g.,Java " />
                </div>
                <button className="post" onClick={postQuestion}>Post</button>
            </div>
        </div>
    )
}

export default Question;