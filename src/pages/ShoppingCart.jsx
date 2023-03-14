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
      <h1>ShoppingCart</h1>

      {product.length > 0 &&
        product.map((product) => {
          return (
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
              </Card>
              <br />
            </>
          );
        })}
    </div>
  );
}

export default ShoppingCart;
