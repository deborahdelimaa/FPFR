import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductService from '../services/product.service';

function AddProduct() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { title, description };
    try {
      await ProductService.createProduct({ name, description });
      navigate('/products');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <h1>Create project:</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleName}
        />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={handleDescription}
        />
        <button type="submit">Create product</button>
      </form>
    </section>
  );
}

export default AddProduct;
