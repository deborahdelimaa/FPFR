import React from 'react'
import Card from 'react-bootstrap/Card';
import '../homeCompon.css'
import { Link } from 'react-router-dom';
import Reviews from '../images/reviews.png';
import Shop from '../images/shop.png';
import MyProducts from '../images/myproducts.png';
import MyCard from '../images/purchases.png';

function HomeCompo() {
  return (
    <div className='compoDiv'>
    <div>
    <Link to="/products">
        <Card className="bg-white text-black">
      <Card.Img src={Shop} alt="Card image" />
      <Card.ImgOverlay className="imgHover">
        <Card.Title className="title">Shop</Card.Title>
        
      </Card.ImgOverlay>
    </Card>
    </Link>
    </div>
    <div>
    <Link to="/myProducts">
    <Card className="bg-white text-black">
      <Card.Img  src={MyProducts} alt="Card image" />
      <Card.ImgOverlay className="imgHover">
        <Card.Title className="title">My products</Card.Title>
        
      </Card.ImgOverlay>
    </Card>
    </Link>
    </div>
    <div>
    <Link to="/products/bought">
    <Card className="bg-white text-black">
      <Card.Img src={MyCard} alt="Card image" />
      <Card.ImgOverlay className="imgHover">
        <Card.Title className="title">Shopping Cart</Card.Title>
        
      </Card.ImgOverlay>
    </Card>
    </Link>
    </div>
   
    </div>
  )
}

export default HomeCompo


/* shop, reviews, my products purchesed,  */