import React from 'react';
import HomeCompo from '../components/HomeCompo';
import Introduction from './Introduction';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function Home() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <div>
      {loggedIn ? (
        <>
          <HomeCompo />
        </>
      ) : (
        <>
          <Introduction />
        </>
      )}
    </div>
  );
}

export default Home;
