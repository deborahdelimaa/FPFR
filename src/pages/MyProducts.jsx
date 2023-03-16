import React, { useState, useEffect, useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import productService from '../services/product.service';
import { AuthContext } from '../context/auth.context';
import { Link, useParams, useNavigate } from 'react-router-dom';

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
      <br />
      {myProducts.length > 0 &&
        myProducts.map((product) => {
          return (
            <div className="myProducts">
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
                    <h8>Description: {product.description}</h8>
                    <br />
                    <br />

                    {product && (
                      <button className="submit" style={{ hover: 'none' }}>
                        <Link
                          className="review-button"
                          to={`/products/edit/${product._id}`}
                        >
                          Edit product
                        </Link>
                      </button>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
              <br />
            </div>
          );
        })}
    </section>
  );
}
export default MyProducts;
