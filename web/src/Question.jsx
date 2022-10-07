import React, { useState } from "react";
import ReactMarkdown from 'react-markdown'

// import CodeMirror from '@uiw/react-codemirror';
// import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
// import { languages } from '@codemirror/language-data';

import { db } from "./utils/firebase.js";
import { collection, addDoc } from "firebase/firestore";

import "./Question.css";
// Get the collection of articles in question
const Q_A = collection(db, "Q_A");

function Question() {
    const [title, setTitle] = useState("");
    const [describe, setDescribe] = useState("");
    const [tags, setTags] = useState([]);
// Generate date and return
    function getDate() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        return `${year}-${month > 9 ? month : "0" + month}-${day > 9 ? day : "0" + day}`;
    }
// Submit a question to firebase
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
                <div className="t2-content">
                    <textarea value={describe} placeholder="please ensure markdown syntax correctness." onChange={e => setDescribe(e.target.value)} className="problem"></textarea>
                    <div className="markdownPre"><ReactMarkdown>{describe}</ReactMarkdown></div>
                </div>

                {/* <CodeMirror value={markdownData} extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]} />; */}
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