import React, { useState, useEffect, useContext } from "react";
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from "../context/auth.context";
import "../auth.css";


function EditProduct() {

  const {user} = useContext(AuthContext)

  
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

    const navigate = useNavigate()

    const {id} = useParams();
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const body = { name, price, category, condition, description, seller:user._id }
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${id}`, body)
            setName("")
            setPrice("")
            setCategory("")
            setCondition("")
            setDescription("")
            navigate(`/myProducts`)
            
        } catch (error) {
            console.log(error)
        }
    }

    const getProduct = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/products/${id}`
        );
          console.log(response.data);
         
          setName(response.data.name)
          setPrice(response.data.price)
          setCategory(response.data.category)
          setCondition(response.data.condition)
          setDescription(response.data.description)

          navigate(`/products/edit/:id`);
        } catch (error) {
          console.log(error);
        }
      };

      const deleteProduct = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
            navigate("/products")
        } catch (error) {
            console.log(error)
            
        }
      }

      useEffect(()=> {
        getProduct()
      }, [])
    
      
  return (
    <section>
<h1>Edit product:</h1>
<form onSubmit={handleSubmit} className="form">
<input required="true" className="main-input" type="text" name="name" id="name" value={name} onChange={handleName}  />
        <br />
        <input required="true" className="main-input" type="text" name="description" id="description" value={description} onChange={handleDescription} placeholder="Description" />
        <br />
        <input required="true" className="main-input" type="text" name="price" id="price" value={price} onChange={handlePrice} placeholder="Price" />
        <br />
        <select style={{height:"6vh"}} required="true" className="main-input" name="category" id="category" onChange={handleCategory} value={category}>
          {categories.map((filters) => {
            return <option value={filters}>{filters}</option>;
          })}
        </select>
        <br />
        <select style={{height:"6vh"}} required="true" className="main-input" name="condition" id="condition" onChange={handleCondition} value={condition}>
          {conditions.map((filters) => {
            return <option value={filters}>{filters}</option>;
          })}
        </select>
   
        <button style={{marginRight:"0.5vw"}} className="submit" type="submit">Edit Product</button>
</form>

<button  style={{marginRight:"0.5vw"}} className="submit" onClick={deleteProduct}>Delete</button>

    </section>
  )
}

export default EditProduct