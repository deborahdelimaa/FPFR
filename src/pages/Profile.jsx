import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import Figure from 'react-bootstrap/Figure';

function Profile() {
  const [profile, setProfile] = useState(null);
  const { user, loading } = useContext(AuthContext);

  const getProfile = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/user/${user._id}`
      );
      console.log(response.data);
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, [loading]);

  return (
    
    <section className="formdiv">
      {profile && (
        <Figure
          style={{ marginTop: "4vh", width: "35vw", padding: "5vh" }}
        className="form"
        >
        <p>My Profile</p>
          <Figure.Image
            style={{ marginLeft: '1vw', marginTop: '3vh' }}
            width={100}
            height={100}
            alt="profile-picture"
            src={profile.img}
          />
          <br />
          <br />
          <Figure.Caption
            style={{ fontSize: '3em', color: 'white', marginLeft: '1vw', borderBottom:"1px solid #6c6c6c"}}
          >
            <p>Name: {profile.name}</p>
          </Figure.Caption>
          <br />
          <Figure.Caption
            style={{ fontSize: '2.5em', color: 'white', marginLeft: '1vw', borderBottom:"1px solid #6c6c6c", Width:"5vw" }}
          >
            <p>Email: {profile.email}</p>
          </Figure.Caption>
          <br />
          <Figure.Caption
            style={{ fontSize: '2.5em', color: 'white', marginLeft: '1vw', borderBottom:"1px solid #6c6c6c" }}
          >
            <p>Contact: {profile.contact}</p>
          </Figure.Caption>
        </Figure>
      )}
      <br />
      {profile && (
        <button className="button-one" style={{ marginLeft: '3vw' }}>
          <Link to={`/profile/edit/${profile._id}`} key={profile._id}>
            Edit profile
          </Link>{' '}
        </button>
      )}
    </section>
  );
}

export default Profile;
