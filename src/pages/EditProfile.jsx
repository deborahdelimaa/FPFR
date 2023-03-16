import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import '../auth.css';
import service from '../services/user.service';

function EditProfile() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [img, setImg] = useState('');
  const { logout } = useContext(AuthContext);

  const handleName = (e) => setName(e.target.value);
  const handleContact = (e) => setContact(Number(e.target.value));

  const navigate = useNavigate();

  const { id } = useParams();

  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    uploadData.append('img', e.target.files[0]);

    service
      .updateImage(uploadData)
      .then((response) => {
        console.log(response);
        setImg(response.data.fileUrl);
      })
      .catch((err) => console.log('Error while uploading the file: ', err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { name, contact, img };
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/auth/user/${id}`, body);
      setName('');
      setContact('');

      navigate(`/profile`);
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/user/${id}`
      );
      console.log(response.data);
      setName(response.data.name);
      setContact(response.data.contact);
      setImg(response.data.img);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProfile = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/auth/user/${id}`);
      navigate('/intro');
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <section>
      <form
        style={{ marginLeft: '35vw', width: '30vw' }}
        className="form"
        onSubmit={handleSubmit}
      >
        <p>Edit profile</p>
        <div className="group">
          <input
            required="true"
            className="main-input"
            type="text"
            value={name}
            onChange={handleName}
          />
          <span className="highlight-span"></span>
          <label className="lebal-email">Name</label>
        </div>

        <div className="container-1">
          <div className="group">
            <input
              className="main-input"
              type="contact"
              onChange={handleContact}
            />
            <span className="highlight-span"></span>
            <label className="lebal-email">Contact</label>
          </div>
          <br />
          <div className="group">
            <input
              className="main-input"
              type="file"
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
        </div>
        <button className="submit">Edit Profile</button>
      </form>

      <button className="delete-button" onClick={deleteProfile}>
        Delete
      </button>
    </section>
  );
}

export default EditProfile;
