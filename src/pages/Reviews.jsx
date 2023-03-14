 import React, {useState, useEffect} from 'react'
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


function Reviews() {
  
  const getReviews = async () =>{
    const [review, setReview] = useState("")

    try {
      const response = await productService.getAllReviews();
      console.log(response.data);
      setReview(response.data);
    } catch (error) {
      console.log(error)
    }
  }; 
  
  return (
    <div>

    </div>
  )
}

export default Reviews