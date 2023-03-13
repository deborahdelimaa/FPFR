import React from 'react'
import Card from 'react-bootstrap/Card';
import homeCompon from '../homeCompon.css'
import { Link } from 'react-router-dom';

function HomeCompo() {
  return (
    <div className='compoDiv'>
    <div>
    <Link to="/products">
        <Card className="bg-white text-black">
      <Card.Img src="https://productmanagementfestival.com/wp-content/uploads/2017/01/sell-your-product-online.jpg" alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title className="title">Shop</Card.Title>
        <Card.Text className="title">
          Click here to shop or trade new items
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
    </Link>
    </div>
    <div>
    <Link to="/myProducts">
    <Card className="bg-white text-black">
      <Card.Img src="https://media.istockphoto.com/id/1388175035/photo/hand-truck-with-cardboard-boxes-on-blue-background-moving-house-concept-relocation-cargo.jpg?b=1&s=170667a&w=0&k=20&c=sBuqMuHKDtuF749Azh-Zo6XN1K7mt2ssitGoCoxJu10=" alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title className="title">My products</Card.Title>
        <Card.Text className="title">
          Click here to see the products you are selling.
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
    </Link>
    </div>
    <div>
    <Link to="/shoppingCart">
    <Card className="bg-white text-black">
      <Card.Img src="https://gamipress.com/wp-content/uploads/2018/12/purchases.svg" alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title className="title">Shopping Cart</Card.Title>
        <Card.Text className="title">
          Click here to see your purchases.
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
    </Link>
    </div>
    <div>
    <Link to="/reviews">
    <Card className="bg-white text-white">
      <Card.Img src="https://easydigitaldownloads.com/wp-content/uploads/edd/2016/04/product-reviews-featured-image.png" alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title className="title">Reviews</Card.Title>
        <Card.Text className="title">
          Click here to see your reviews.
        </Card.Text>
      
      </Card.ImgOverlay>
    </Card>
    </Link>
    </div>
    </div>
  )
}

export default HomeCompo


/* shop, reviews, my products purchesed,  */