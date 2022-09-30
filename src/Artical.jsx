import React, { useState } from "react";
import { app, db } from "./utils/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import "./Artical.css";

const Q_A = collection(db, "Q_A");

function Artical() {
    const [title, setTitle] = useState("");
    const [abstract, setAbstract] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);

    const postArtical = () => {
        addDoc(Q_A, {
            type: 1,
            title,
            abstract,
            content,
            tags
        }).then(result => {
            console.log(result);
            setTitle("");
            setAbstract("");
            setContent("");
            setTags([]);
            alert("post article success!");
        }).catch(error => {
            console.log(error);
            alert("post article fail!");
        })
    }

    const upFile = () => {
        let file = document.getElementById("upFile").files[0];
        if (file) {
            const storage = getStorage(app);
            const storageRef = ref(storage,"public");
            uploadBytes(storageRef, file).then((snapshot) => {
                document.getElementById("upFile").value = null;
                alert('Uploaded file Success!');
            });
        }
    }
    return (
        <div>
            <div className="t1">
                <h4>Title:</h4>
                <input value={title} onChange={e => { setTitle(e.target.value) }} className="Title" placeholder="Enter a descriptive title" />
            </div>
            <div className="t1" style={{ "marginTop": "12px" }}>
                <h4>Add an image:</h4>
                <input id="upFile" type="file" />
                <button style={{ "height": "20px" }} onClick={() => {
                    upFile()
                }}>upload</button>
            </div>
            <div className="t2">
                <h4 style={{ float: "left" }}>Abstract</h4>
                <textarea value={abstract} onChange={e => setAbstract(e.target.value)} placeholder="Enter a 1-paragraph abstract" className="abstract" />
            </div>
            <div className="t4">
                <h4 style={{ float: "left" }}>Artical Text</h4>
                <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Enter a 1-paragraph abstract" className="text" />
            </div>
            <div className="t5">
                <h4>Tags:</h4>
                <input value={tags.join(",")} onChange={e => { setTags(e.target.value.split(",")) }} className="Title" placeholder="Please add up to 3 tags describe what your question is about e.g.,Java " />
            </div>
            <button className="post" onClick={postArtical}>Post</button>
        </div>
    )
}

export default Artical