import React, { useState, useEffect, useContext } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import productService from '../services/product.service';
import Searchbar from '../components/Searchbar';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function Products() {
  const [products, setProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [search, setSearch] = useState('');

  const getProducts = async () => {
    try {
      const response = await productService.getAllProducts();
      console.log(response.data);
      setProducts(response.data);
      setSearchProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (category === 'All') {
      setSearchProducts(products);
    } else {
      let filter = [];
      products.map((el) => {
        if (el.category === category) {
          filter.push(el);
        }
      });
      setSearchProducts(filter);
    }
  }, [category]);

  useEffect(() => {
    if (condition === 'All') {
      setSearchProducts(products);
    } else {
      let filter = [];

      products.map((el) => {
        if (el.condition === condition) {
          filter.push(el);
        }
      });

      setSearchProducts(filter);
    }
  }, [condition]);

  useEffect(() => {
    let filter = [];

    products.map((el) => {
      if (el.name.startsWith(search)) {
        filter.push(el);
      }
    });

    setSearchProducts(filter);
  }, [search]);

  return (
    <section>
      <h1>Products</h1>
      
      <Searchbar
        setCategory={setCategory}
        setCondition={setCondition}
        setSearch={setSearch}
      />
      {searchProducts.length &&
        searchProducts.map((product) => {
          return (
            <Link
              className="link"
              to={`/products/${product._id}`}
              key={product._id}
            >
              <Card className='product-card'>
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
            </Link>
          );
        })}
    </section>
  );
}

export default Products;
