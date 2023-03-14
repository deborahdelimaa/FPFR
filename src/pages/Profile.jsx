import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
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
    <div>
    <h1>My profile</h1>
      {profile && (
        <Figure style={{border:"2px solid white", marginLeft:"3vw", marginTop:"3vh", borderRadius:"5px"}}>
      <Figure.Image
        width={171}
        height={180}
        alt="profile-picture"
        src={profile.img}
      />
      <Figure.Caption style={{fontSize:"3em", color:"white"}}>
       {profile.name}
      </Figure.Caption>
      <Figure.Caption style={{fontSize:"2.5em", color:"white"}}>
       {profile.email}
      </Figure.Caption>
      <Figure.Caption style={{fontSize:"2.5em", color:"white"}}>
       {profile.contact}
      </Figure.Caption>
    </Figure>
      )}
      <br />
      {profile && (
        <button className="button-one" style={{marginLeft:"3vw"}}><Link to={`/profile/edit/${profile._id}`} key={profile._id}>
          Edit profile
        </Link> </button>
      )}
    </div>
  );
}

export default Profile;
