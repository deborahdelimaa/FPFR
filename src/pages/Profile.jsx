import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

function Profile() {
  const [profile, setProfile] = useState([]);
  const { user } = useContext(AuthContext);

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
  }, []);

  return (
    <div>
      {profile && (
        <>
          <img src={profile.img} alt="" />
          <h1>{profile.name}</h1>
          <p>{profile.email}</p>
          <p>{profile.contact}</p>
        </>
      )}
      {profile && (
        <Link to={`/profile/edit/${profile._id}`} key={profile._id}>
          Edit profile
        </Link>
      )}
    </div>
  );
}

export default Profile;