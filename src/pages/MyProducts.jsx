import React, { useState, useEffect, useContext } from "react";
import { Card, Button } from "react-bootstrap";
import productService from "../services/product.service";
import { AuthContext } from "../context/auth.context";

function MyProducts() {
  const [myProducts, setMyProducts] = useState([]);
  const { user } = useContext(AuthContext);

  const getProducts = async () => {
    try {
      const response = await productService.getAllProducts();
      const userProducts = response.data.filter((product) => {
        return product.seller === user._id;
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
  }, []);

  return (
    <section>
      <h1>My Products</h1>
      {myProducts &&
        myProducts.map((product) => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={product.img} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          );
        })}
    </section>
  );
}
export default MyProducts;