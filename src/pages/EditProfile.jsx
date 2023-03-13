import React, {useState, useEffect} from 'react'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'


function EditProfile() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("second")
    const [contact, setContact] = useState("")
    const [img, setImg] = useState("")

    
    const handleName = (e) => setName(e.target.value)
    const handleEmail = (e) => setEmail(e.target.value)
    const handleContact = (e) => setContact(Number(e.target.value))
    const handleImg = (e) => setImg(e.target.value)

    const navigate = useNavigate()

    const {id} = useParams();
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const body = {name, email, contact, img}
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/user/${id}`, body)
            navigate(`/profile/${id}`)
            
        } catch (error) {
            console.log(error)
        }
    }

    const getProfile = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/auth/user/${id}`
        );
          console.log(response.data);
          setName(response.data.name)
          setEmail(response.data.email)
          setContact(response.data.contact)
          setImg(response.data.img)
        } catch (error) {
          console.log(error);
        }
      };

      const deleteProfile = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/auth/user/${id}`)
            navigate("/")
        } catch (error) {
            console.log(error)
            
        }
      }

      useEffect(()=> {
        getProfile()
      }, [])
    
      
  return (
    <section>
<form className="form" onSubmit={handleSubmit}>
  <p>Edit profile</p>
  <div className="group" >
    <input required="true" className="main-input" type="text" value={name} onChange={handleName} />
    <span className="highlight-span"></span>
    <label className="lebal-email">Name</label>
  </div>
  <br />
  <div className="group">
  
    <input required="true" className="main-input" type="text" value={email} onChange={handleEmail} />
    <span className="highlight-span"></span>
    <label className="lebal-email">Email</label>
  </div>
  <div className="container-1">
    <div className="group">
      <input required="true" className="main-input" type="contact" value={contact} onChange={handleContact} />
      <span className="highlight-span"></span>
      <label className="lebal-email">Password</label>
    </div>
    <div className="group">
  
    <input required="true" className="main-input" type="file" value={img} onChange={handleImg} />
    <span className="highlight-span"></span>
    <label className="lebal-email"></label>

  </div>
  </div>
  <button className="submit">Edit Profile</button>
</form>

<button onClick={deleteProfile}>Delete</button>

    </section>
  )
}

export default EditProfile