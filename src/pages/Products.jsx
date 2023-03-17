import React, { useState, useEffect, useContext } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import productService from '../services/product.service';
import Searchbar from '../components/Searchbar';
import Card from 'react-bootstrap/Card';

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
      <br />
      <div
        className="searchbar-div"
        style={{ marginLeft: '20vw',  }}
      >
        <Searchbar
          setCategory={setCategory}
          setCondition={setCondition}
          setSearch={setSearch}
        />
      </div>
      {searchProducts.length > 0 &&
        searchProducts.map((product) => {
          return (
            <Link
              className="link"
              to={`/products/${product._id}`}
              key={product._id}
            >
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
                <Card.Img
                  variant="left"
                  src={product.img}
                  alt="product img"
                  className="allProductsImg"
                  style={{
                    border: 'solid #22577A 2px',
                    borderRadius: '15px',
                    marginLeft: '0px',
                    marginRight:"4vw",
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
                    <h5>Price: {product.price} €</h5>
                    <br />
                    <h8>Condition: {product.condition} </h8>
                    <br />
                    <h8>Category: {product.category}</h8>
                    <br />
                    <br />
                    <h8>Seller: {product.seller && product.seller.name}</h8>
                  </Card.Text>
                </Card.Body>
              </Card>
              <br />
            </Link>
          );
        })}
    </section>
  );
}

export default Products;
