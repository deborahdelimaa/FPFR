import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import Card from 'react-bootstrap/Card';

function ProductsDetails() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products/${id}`
      );
      console.log(response.data);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const buyProduct = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/buy/${user._id}/${id}`
    );
    console.log(response.data);
  navigate('/products/bought'); 
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  const addFavorite = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/favorites/${user._id}/${id}`
    );
    console.log(response.data);
      navigate("/favorites");
    
    }
  

  useEffect(() => {
    getProduct();
  }, [id]);

  return (
    <div>
      {product && (
        <>
        <br />
          <Card className="product-card">
            <Card.Title>{product.name}</Card.Title>
            <Card.Body>
              <Card.Img
                variant="left"
                src={product.img}
                alt="product img"
                className="allProductsImg"
              />
              <Card.Text>
                Category: {product.category}
                <br />
                Condition: {product.condition}
                <br />
                Price: {product.price} €
                <br />
                Description: {product.description}
                <br />
                Seller: {product.seller && product.seller.name}
                
              </Card.Text>
            </Card.Body>
            <button
              className="submit"
              type="submit"
              onClick={() => buyProduct()}
            >
              Buy Product
            </button>
            <button
              className="submit"
              type="submit"
              onClick={() => addFavorite()}
            >Add to Favorites</button>
            {product && <button className='submit' style={{backgroundColor:"#3FB8C3"}}> <Link  className='review-button' to={`/review/${product._id}`}>Add a review</Link></button>}
          </Card>
          <br />

          <Card className="product-card">
            <h4 style={{width:"70vw", margin:"auto", color:"#22577a"}}>Reviews:</h4>
                <br />
               
                {product.feedback.map((review) => {
                  return <div style={{width:"70vw", margin:"auto"}}>
                  <br />
                 <h5> Rating: {review.rating}</h5>
                  {review.comment[0]}
                  <br />
                  <br />
                  <hr style={{width:"70vw", margin:"auto"}}/>
                  </div>;
                })}
          </Card>
        </>
      )}
    </div>
  );
}

export default ProductsDetails;