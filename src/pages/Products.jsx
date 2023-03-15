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
      <div className='searchbar-div'>
      <Searchbar
        setCategory={setCategory}
        setCondition={setCondition}
        setSearch={setSearch}
      /></div>
      {searchProducts.length > 0 &&
        searchProducts.map((product) => {
          return (
            <Link
              className="link"
              to={`/products/${product._id}`}
              key={product._id}
            >
              <Card className='product-card'
              style={{ display: "flex", 
              flexDirection: "row", 
              flexWrap:"nowrap", 
              alignItems: "stretch", 
              alignContent: "stretch"}}>
              
              <div className="image" style={{ marginright: "0 vw"}}>
              <Card.Img
                variant="left"
                src={product.img}
                alt="product img"
                className="allProductsImg"
              />
              </div>
              <div className="productInfo">
              <Card.Title> <h3>{product.name}</h3><h6>Price: {product.price} €</h6></Card.Title>
              <Card.Body>
                <Card.Text>             
                  <p>Condition: {product.condition}</p>
                  <p>Category: {product.category}</p>
                  <p>Description: {product.description}</p>
                  <p>Seller: {product.seller && product.seller.name}</p>
                </Card.Text>
              </Card.Body>
              </div>
              </Card>
              <br />              
            </Link>
            
          );
        })}
    </section>
  );
}

export default Products;
