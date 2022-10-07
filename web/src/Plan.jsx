import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
// plan 
function Plan() {
   return (
      <div>
         <h1>Choose your plan</h1>
         <div className="free">
            <h1>Free</h1>
            <p>see all the tutorial free in 10 days</p>
            <p>Post 2 questions a day</p>
         </div>
         <br></br>
         <div className="premium">
            <h1>Premiun</h1>
            <h3>
               All the things you can see
            </h3>
            <h3>
               No limt for posting question and article
            </h3>
            <br></br>
            <Link to="Payment"><button>Make a payment</button></Link>

         </div>

      </div>
   )
}

export default Plan