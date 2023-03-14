import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import productService from '../services/product.service';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function ShoppingCart() {

  const [product, setProduct] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [search, setSearch] = useState('');

  const getAllBoughtProducts = async () => {
    try {
      const response = await productService.getAllBoughtProducts();
      console.log(response.data);
      setProduct(response.data);      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBoughtProducts();
  }, []);

  return (
    <div>
    <h1>ShoppingCart</h1>

    {searchProducts.length &&
        searchProducts.map((product) => {
          return (
        <>
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
        </>
      )})}
      
    </div>
  )
}

export default ShoppingCart