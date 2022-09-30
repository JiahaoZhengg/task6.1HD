import React from "react";
import Card from "./Card";

import "./Card.css";
import ListArray from "./ListArray";

function cardComponent1(item,i){
return<Card 
technics = {item.technics}
articalname = {item.articalname}
des = {item.des}
name = {item.name}
/>

}

const Cardlist = ()=>{
    return(<div className="box">
     {ListArray.map(cardComponent1)}
     </div>
    )

}

export default Cardlist