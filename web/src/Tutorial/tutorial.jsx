import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { collection, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";

import { app, db } from "../utils/firebase.js";

import "./tutorial.css";

const storage = getStorage(app);
const videosInfo = collection(db, "videosInfo");

let flag = 1;
const videos = [];

function Tutorial() {
    const history = useNavigate();
    const [playVideo, setPlayVideo] = useState({});
    const [videosAry, setVideosAry] = useState([]);
    const [isDisable, setIsDisable] = useState(false);
// Get all video information
    useEffect(() => {
        if (flag) {
            getDocs(videosInfo).then(result => {
                result.docs.forEach(doc => {
                    const obj = {};
                    let val = doc._document.data.value.mapValue.fields;
                    obj.id = doc.id;
                    obj.view = val.view.integerValue;
                    obj.rating = val.rating.integerValue;
                    obj.ref = val.ref.stringValue;
                    videos.push(obj);
                });
                const refAry = [];
                videos.forEach(video => {
                    const reference = ref(storage, `videos/${video.ref}`);
                    refAry.push(getDownloadURL(reference))
                });
                return Promise.all(refAry);
            }).then(result => {
                for (let i = 0; i < result.length; i++) {
                    videos[i].url = result[i];
                }
                setVideosAry(videos);
                setPlayVideo(videos[0]);
                flag = 0;
            }).catch(error => {
                console.log(error);
            })
        }
    })
// Number of video screen plays
    function play() {
        const washingtonRef = doc(db, "videosInfo", playVideo.id);
        updateDoc(washingtonRef, {
            view: Number(playVideo.view) + 1
        });
    }
//  Number of video likes
    function good() {
        if (sessionStorage.getItem("userInfo")) {
            const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

            const washingtonRef = doc(db, "User", userInfo.id);
            updateDoc(washingtonRef, {
                message: arrayUnion(JSON.stringify({
                    time: Date.now(),
                    video: playVideo.ref,
                    status: "1"
                }))
            });

            const washingtonRef2 = doc(db, "videosInfo", playVideo.id);
            updateDoc(washingtonRef2, {
                rating: Number(playVideo.rating) + 1
            });
            setIsDisable(true);
            alert("good success!");
        } else {
            const flag = window.confirm("点赞必须首先登录，要登录吗？");
            if (flag) {
                history("/login");
            }
        }
    }

    return (
        <div className="tutorial">
            <div className="nav">
                <Link to='/'><span>Home</span></Link>
                <Link to='/findQuestion'><span>find question</span></Link>
                <Link to='/tutorial'><span>tutorial</span></Link>
                <Link to='/Plan'><span>Plan</span></Link>
            </div>
            <div className="videos">
                <video className="videoItem" src={playVideo.url} controls preload="metadata" onPlay={() => { play() }}></video>
                <div className="videoData">
                    <span>view：{playVideo.view}</span>
                    <span>rating：{playVideo.rating}</span><button disabled={isDisable} onClick={() => { good() }}>good</button>
                </div>
            </div>
            <div className="videosPre">
                {
                    videosAry.map(video => {
                        return <video key={video.ref} className="preItem" src={video.url} onClick={() => { setPlayVideo(Object.assign({}, video)) }} />
                    })
                }
            </div>
        </div>
    )
}

export default Tutorial;