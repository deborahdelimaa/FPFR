import React from 'react'
import HomeCompo from '../components/HomeCompo'
import Introduction from './Introduction'
function Home() {
  const {loggedIn, user, logout}= useContext(AuthContext)
  return (
    <div>
    {loggedIn ? (
    <>
        <HomeCompo/>
    </>
): (
  <>
    <Introduction/>
  </>
)}
  </div>
  )
}

export default Home

