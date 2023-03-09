import React, {useState, useEffect} from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'


function EditProject() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    
    const handleTitle = (e) => setTitle(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)

    const navigate = useNavigate()

    const {id} = useParams();
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const body = {title, description}
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/projects/${id}`, body)
            navigate(`/projects/${id}`)
            
        } catch (error) {
            console.log(error)
        }
    }

    const getProject = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/projects/${id}`
        );
          console.log(response.data);
          setTitle(response.data.title)
          setDescription(response.data.description)
        } catch (error) {
          console.log(error);
        }
      };

      const deleteProject = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/projects/${id}`)
            navigate("/projects")
        } catch (error) {
            console.log(error)
            
        }
      }

      useEffect(()=> {
        getProject()
      }, [])
    
      
  return (
    <section>
<h1>Edit project:</h1>
<form onSubmit={handleSubmit}>
<label htmlFor="title">Title</label>
<input type="text" name='title' id="title" value={title} onChange={handleTitle} />

<label htmlFor="description">Description</label>
<input type="text" name="description" id="description" value={description} onChange={handleDescription} />
<button type="submit">Edit</button>
</form>

<button onClick={deleteProject}>Delete</button>

    </section>
  )
}

export default EditProject