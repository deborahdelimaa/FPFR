import React, { useState, useEffect, useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import productService from '../services/product.service';
import { AuthContext } from '../context/auth.context';

function MyProducts() {
  const [myProducts, setMyProducts] = useState([]);
  const { user } = useContext(AuthContext);

  const getProducts = async () => {
    try {
      const response = await productService.getAllProducts();
      const userProducts = response.data.filter((product) => {
        return product.seller._id == user._id;
      });
      console.log(response.data);
      console.log(userProducts);
      setMyProducts(userProducts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, [user]);

  return (
    <section>
      <h1>My Products</h1>
      <br/>
      {myProducts.length > 0 &&
        myProducts.map((product) => {
          return (
            
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
            
            
          );
        })}
        
    </section>
  );
}
export default MyProducts;
