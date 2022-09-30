import React from "react";
import "./Card.css";


const imgstyle={
    width: "30%",
    height: "125px"
}

const Card = (props)=>{
    return(<div className="card">
   <img src={props.technics} alt="artical" style={imgstyle }/>
   <h2>{props.articalname}</h2>
   <p>{props.des}</p>
   <h3> {props.name}</h3>
   


     </div>

    )

}

export default Card