import React, { useState, useContext} from 'react';
import { useNavigate} from 'react-router-dom';
import ProductService from '../services/product.service';
import { AuthContext } from '../context/auth.context';


function AddProduct() {
  const {user} = useContext(AuthContext)


  const [img, setImg] = useState('')
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Other');
  const [condition, setCondition] = useState('Used');
  const [description, setDescription] = useState('');

  const categories = ['Other', 'Vehicles', 'Technology', 'Furniture', 'Sport', 'Animals'];
  const conditions = ['Used', 'New']


  const handleImg = (e) => setImg(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handlePrice = (e) => setPrice(e.target.value);
  const handleCategory = (e) => setCategory(e.target.value);
  const handleCondition = (e) => setCondition(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { name, price, category, condition, description, seller:user._id };
    try {
      await ProductService.createProduct(body);
      navigate('/products');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="formdiv">
      <form style={{marginTop:"4vh", width:"30vw"}}className="form" onSubmit={handleSubmit}>
      <p>Create Product:</p>

        <input required="true" className="main-input" type="text" name="name" id="name" value={name} onChange={handleName} placeholder="Name" />
        <br />
        <input required="true" className="main-input" type="text" name="description" id="description" value={description} onChange={handleDescription} placeholder="Description" />
        <br />
        <input required="true" className="main-input" type="text" name="price" id="price" value={price} onChange={handlePrice} placeholder="Price" />
        <select required="true" className="main-input" name="category" id="category" onChange={handleCategory} value={category}>
          {categories.map((filters) => {
            return <option value={filters}>{filters}</option>;
          })}
        </select>
        
        <select required="true" className="main-input" name="condition" id="condition" onChange={handleCondition} value={condition}>
          {conditions.map((filters) => {
            return <option value={filters}>{filters}</option>;
          })}
        </select>
        <input className="main-input" type="file" name='img' id='img' value={img} onChange={img} placeholder="Add Image" />    
        <button style={{marginRight:"0.5vw"}}required="true" className="submit" type="submit">Create Product</button>
      </form>
     </section>
    );
}

export default AddProduct;
