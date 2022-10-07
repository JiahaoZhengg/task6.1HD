import React from "react";
import './App.css';
import "./Button.css";

import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Sign from "./Sign";
import Postpage from "./Postpage";
import FindQuestion from "./FindQuestion";
import MyHome from "./MyHome/myHome.jsx";
import Tutorial from "./Tutorial/tutorial.jsx";
import Detail from "./Detail/detail.jsx";
import Plan from "./Plan";
import Payment from "./Payment";

function App() {
    return (
        <div className="all">
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/Sign" element={<Sign />} />
                <Route path="/Postpage" element={<Postpage />} />
                <Route path="/findQuestion" element={<FindQuestion />} />
                <Route path="/MyHome" element={<MyHome />} />
                <Route path="/tutorial" element={<Tutorial />} />
                <Route path="/detail/:time/:video" element={<Detail />} />
                <Route path="/Plan" element={<Plan />} />
                <Route path="/Plan/Payment" element={<Payment />} />
            </Routes>
        </div>
    )
}

export default App
