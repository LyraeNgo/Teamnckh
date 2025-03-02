import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import ParentModal from '../../components/ParentModal';
import TestZone from '../../components/TestZone';
const Contact = () => {
  const navigate=useNavigate();
  return (
    <div>
      <h1>this is Contact Page</h1>
      <button onClick={()=>navigate(-1)}>back Home</button>

    </div>
  )
}

export default Contact
