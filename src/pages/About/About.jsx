import React from 'react'
import { useNavigate } from 'react-router-dom'
const About = () => {
  const navigate= useNavigate();
  return (
    <div>
      <h1>this is About Page</h1>
      <button onClick={()=>navigate(-1)}>back to Home</button>
    </div>
  )
}

export default About
