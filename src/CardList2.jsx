import React from "react";
import Card from "./Card";

import "./Card.css";
import ArrayList2 from "./ArrayList2";

function cardComponent2(item,i){
return<Card 
technics = {item.technics}
articalname = {item.articalname}
des = {item.des}
name = {item.name}
/>

}

const Cardlist2 = ()=>{
    return(<div className="box">
     {ArrayList2.map(cardComponent2)}
     </div>
    )

}

export default Cardlist2