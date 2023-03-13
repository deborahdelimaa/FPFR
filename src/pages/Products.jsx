import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import productService from '../services/product.service';
import Searchbar from '../components/searchbar';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Products() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await productService.getAllProducts();
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <section>
      <h1>Products</h1>
      <Searchbar/>
      {products.map((product) => {
        return (
          <Link to={`/products/${product._id}`} key={product._id}>
            <Card>
            <Card.Img variant="top" src={product.img} alt="product img" className='allProductsImg' />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                {product.description}
              </Card.Text>
            </Card.Body>
          </Card>
          </Link>
        );
      })}
    </section>
  );
}

export default Products;
