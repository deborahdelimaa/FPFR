import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import productService from '../services/product.service';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

function Favorites() {
  const [product, setProduct] = useState([]);
  const [searchProducts, setSearchProducts] = useState(null);
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [search, setSearch] = useState('');

  const { user } = useContext(AuthContext);
  const { id } = useParams();
  
  const storedToken = localStorage.getItem("authToken");
console.log(searchProducts)

  const addFavorite = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/user/${user._id}`
    );
    console.log(response.data);
    setSearchProducts(response.data.favorite)
    setProduct(response.data.favorite);
  };

  useEffect(() => {
    addFavorite();
  }, [user]);



  const deleteFavorite = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/favorites/${searchProducts._id}`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    deleteFavorite();
  }, []);


  console.log("this is the products", product)

  return (
    <div>
      <h1>Favorites</h1>

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
                    <button  onClick={deleteFavorite}>delete</button>
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

export default Favorites;
