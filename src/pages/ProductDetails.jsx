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
    navigate('/favorites');
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  return (
    <div>
      {product && (
        <>
          <br />
          <Card
            className="product-card"
            style={{
              display: 'flex',
              alignItems: 'left',
              alignContent: 'center',
              width: '60vw',
              margin: 'auto',
              borderRadius: '15px',
              backgroundColor:"rgba(255, 255, 255, 0.58)"
            }}
          >
            <h3 style={{marginLeft:"1vw"}}>{product.name}</h3>
            <br />
            <Card.Body
              style={{
                direction: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                alignItems: 'center',
                alignContent: 'center',
                
              }}
            >
              <Card.Img
                style={{
                  border: 'solid black 2px',
                  borderRadius: '15px',
                  width: '30vw',
                  height: '30vh',
                  alignItems: 'center',
                }}
                variant="left"
                src={product.img}
                alt="product img"
                className="allProductsImg"
              />
              <br />
              <br />
              <hr />
              <Card.Text>
                <h5>Price: {product.price} €</h5>
                <br />
                <br />
                <h8>Condition: {product.condition} </h8>
                <br />
                <h8>Category: {product.category}</h8>
                <br />
                <br />
                <h8>Description: {product.description}</h8>
              </Card.Text>
            </Card.Body>

            <button
              style={{ backgroundColor: '#80ED99' }}
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
            >
              Add to Favorites
            </button>

            {product && (
              <button
                className="submit"
                style={{ backgroundColor: '#3FB8C3' }}
              >
                <Link className="review-button" to={`/review/${product._id}`}>
                  Add a review
                </Link>
              </button>
            )}
          </Card>
          <br />

          <Card
            className="product-card"
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              alignContent: 'center',
              width: '60vw',
              margin: 'auto',
              borderRadius: '15px',
              backgroundColor:"rgba(255, 255, 255, 0.58)"
            }}
          >
            <h4 style={{ width: '50vw', margin: 'auto', color: '#22577a', marginBottom:"2vh" }}>
              Reviews:
            </h4>
            <br />

            {product.feedback.map((review) => {
              return (
                <div style={{ width: '70vw', margin: 'auto' }}>
                  <br />
                  <h5 style={{ margin: 'auto', width: '45vw' }}>
                    {' '}
                    Rating: {review.rating}
                  </h5>
                  <br />
                  <h6 style={{ margin: 'auto', width: '45vw' }}>
                    {review.comment[0]}
                  </h6>
                  <br />
                  <br />
                  <hr style={{ width: '50vw', margin: 'auto' }} />
                </div>
              );
            })}
          </Card>
        </>
      )}
    </div>
  );
}

export default ProductsDetails;
