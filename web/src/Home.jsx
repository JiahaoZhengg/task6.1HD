import React from "react";
import Header from "./Header";
import deakin from "./1.png"
import Cardlist from "./CardList";
import Cardlist2 from "./CardList2";
import Ender from "./Ender";
import Contact from "./Contact";
import { Link } from 'react-router-dom';

const imgstyle = {
    width: "100%",
    height: "600px"
}

function Home() {
    return (
        <div>
            <div className="nav">
                <Link to='/'><span>Home</span></Link>
                <Link to='/findQuestion'><span>find question</span></Link>
                <Link to='/tutorial'><span>tutorial</span></Link>
                <Link to='/Plan'><span>Plan</span></Link>
            </div>
            <Header />
            <img src={deakin} alt="deakin" style={imgstyle} />
            <br></br>
            <h1>Featured Articles</h1>
            <Cardlist /><br></br>
            <button className="Button">see all articles</button>
            <br></br>
            <h1>Featured Tutorials</h1>
            <Cardlist2 /><br></br>
            <button className="Button">see all tutorials</button>
            <br></br>
            <Ender />
            <Contact />
        </div>
    )
}

export default Home