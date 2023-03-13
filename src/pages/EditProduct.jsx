import React, {useState, useEffect} from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'


function EditProduct() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    
    const handleName = (e) => setName(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)

    const navigate = useNavigate()

    const {id} = useParams();
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const body = {name, description}
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${id}`, body)
            navigate(`/products/${id}`)
            
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
          setDescription(response.data.description)
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
<form onSubmit={handleSubmit}>
<label htmlFor="name">Name</label>
<input type="text" name='name' id="name" value={name} onChange={handleName} />

<label htmlFor="description">Description</label>
<input type="text" name="description" id="description" value={description} onChange={handleDescription} />
<button type="submit">Edit</button>
</form>

<button onClick={deleteProduct}>Delete</button>

    </section>
  )
}

export default EditProduct