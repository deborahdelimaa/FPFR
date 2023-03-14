import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

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
          <h1>{product.name}</h1>
          <p>{product.description}</p>
        </>
      )}
      
        {product && <Link to={`/products/edit/${product._id}`}>Edit product</Link>}
    </div>
  );
}

export default ProductsDetails;
