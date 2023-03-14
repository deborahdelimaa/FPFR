import React from "react";
import '../intro.css'
import { Link } from "react-router-dom";

function Introduction() {
   
  return (
    <div>
      <div className="intro-div">
        <p className="intro-paragraph">Welcome to buyable! <br/>
        
          Buy and sell cars, houses, and many others... <br/>
        
        Everything with the best price!</p>
        <img className="intro-img"
          src="https://static.vecteezy.com/system/resources/previews/010/925/513/original/purchasing-habits-generate-consumer-habit-marketing-research-millennial-purchasing-preference-shopping-habitual-buying-behavior-flat-design-modern-illustration-vector.jpg"
          alt=""
        />
      </div>
      <div className="intro-div">
        <img className="intro-img" src="https://www.statcan.gc.ca/o1/sites/default/files/2021-11/shopping_2.jpg" alt="" />
        <p className="intro-paragraph"> Do your shopping in a fast and easy way.<br/>
        Signup and login to see more.</p>
      </div>
      <div className="intro-button">
    <Link to="/signup"> <button class="button">
    Signup
</button> </Link>
<Link to="/login"><button class="button">
    Login
</button></Link>
      </div>
    </div>
  );
}

export default Introduction;
