import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Card from 'react-bootstrap/Card';

function ProductsDetails() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { user, loading } = useContext(AuthContext);

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

  useEffect(() => {
    getProduct();
  }, [id]);

  return (
    <div>
      {product && (
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
               <button className="submit" type="submit">Buy Product</button>
              </Card>
        </>
      )}
      
    </div>
  );
}

export default ProductsDetails;
