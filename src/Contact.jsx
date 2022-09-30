import React from "react";
import "./Contact.css";
import { Button } from 'semantic-ui-react'



function Contact(){
return(<div className="Contact">
<table className="table">
  <tr className="th">
    <th>Explore</th>
    <th>Support</th>
    <th>Stay Connect</th>
  </tr>
  <tr>
    <td><a  href="">Home</a></td>
    <td><a  href="">FAQs</a></td>
    
  </tr>
  <tr>
    <td><a  href="">Question</a></td>
    <td><a  href="">Help</a></td>
    <td><div>
    <Button circular color='facebook' icon='facebook' />
    <Button circular color='twitter' icon='twitter' />
    <Button circular color='linkedin' icon='linkedin' />
    <Button circular color='google plus' icon='google plus' />
  </div></td>
    
  </tr>
  <tr>
    <td><a  href="">Articles</a></td>
    <td><a  href="">Contact Us</a></td>
    <td></td>
  </tr>
  <tr>
    <td><a  href="">Tutorials</a></td>
    
  </tr>
</table>
<h1>DEV@Deakin 2022</h1>

<a href="" className="end">Privacy Policy</a >
<a href=""className="end"> Terms</a>
<a href=""className="end">Code of conduct</a>



</div>
)
}


export default Contact