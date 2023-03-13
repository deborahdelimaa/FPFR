import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function ProductsDetails() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

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
      <h2>Tasks</h2>
      {product &&
        product.tasks.map((task) => {
          return (
            <div key={task._id}>
              <h3>{task.name}</h3>
              <p>{task.description}</p>
            </div>
          );
        })}
        {product && <Link to={`/products/edit/${product._id}`}>Edit product</Link>}
    </div>
  );
}

export default ProductsDetails;
