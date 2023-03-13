import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductService from '../services/product.service';

function AddProduct() {


  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Other');
  const [condition, setCondition] = useState('Used');
  const [description, setDescription] = useState('');

  const categories = ['Other', 'Vehicles', 'Technology', 'Furniture', 'Sport', 'Animals'];
  const conditions = ['Used', 'New']
  

  const handleName = (e) => setName(e.target.value);
  const handlePrice = (e) => setPrice(e.target.value);
  const handleCategory = (e) => setCategory(e.target.value);
  const handleCondition = (e) => setCondition(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { name, price, category, condition, description };
    try {
      await ProductService.createProduct({ name, price, category, condition, description });
      navigate('/products');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="formdiv">
      <form className="form" onSubmit={handleSubmit}>
      <p>Create Product:</p>
    
        <input required="true" className="main-input" type="text" name="name" id="name" value={name} onChange={handleName} placeholder="Name" />
        <br />
        <input required="true" className="main-input" type="text" name="price" id="price" value={price} onChange={handlePrice} placeholder="Price" />
        <br />
        <select required="true" className="main-input" name="category" id="category" onChange={handleCategory} value={category}>
          {categories.map((filters) => {
            return <option value={filters}>{filters}</option>;
          })}
        </select>
        <br />
        <select required="true" className="main-input" name="condition" id="condition" onChange={handleCondition} value={condition}>
          {conditions.map((filters) => {
            return <option value={filters}>{filters}</option>;
          })}
        </select>
        <br />
        <input required="true" className="main-input" type="text" name="description" id="description" value={description} onChange={handleDescription} placeholder="Description" />
        <br />
        <button required="true" className="submit" type="submit">Create Product</button>
      </form>
     </section>
    );
}

export default AddProduct;
