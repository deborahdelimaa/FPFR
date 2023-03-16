import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import productService from '../services/product.service';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

function ShoppingCart() {
  const [product, setProduct] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [search, setSearch] = useState('');

  const { user } = useContext(AuthContext);

  const getProduct = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/user/${user._id}`
    );
    console.log(response.data);
    setProduct(response.data.boughtProduct);
  };

  useEffect(() => {
    getProduct();
  }, [user]);

  return (
    <div>
      {product.length > 0 &&
        product.map((product) => {
          return (
            <div className="favoriteProducts">
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
                }}
              >
                <Card.Img
                  variant="left"
                  src={product.img}
                  alt="product img"
                  className="allProductsImg"
                  style={{
                    border: 'solid black 2px',
                    borderRadius: '15px',
                    marginLeft: '0px',
                    width: '25vw',
                    height: '30vh',
                  }}
                />

                <Card.Body>
                  <Card.Title>
                    <h3>{product.name}</h3>
                    <hr style={{ width: '20vw' }} />
                  </Card.Title>
                  <Card.Text>
                    Price: {product.price} €
                    <br />
                    <br />
                    Category: {product.category}
                    <br />
                    Condition: {product.condition}
                    <br />
                    <br />
                    Description: {product.description}
                  </Card.Text>
                </Card.Body>
              </Card>
              <br />
            </div>
          );
        })}
    </div>
  );
}

export default ShoppingCart;
