import React from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';

const Home = () => {
  const navigate= useNavigate();
  return (
    <div>
      <NavBar>
        <a href="/">Home</a>|
        <a href="/About">About</a>|
        <a href="/Contact">Contact</a>
      </NavBar>
      <h1>this is Home Page</h1>
      <button className='mr-2'onClick={()=>navigate("/Contact")}>To Contact</button>
      <button onClick={()=>navigate("/MainPage")}>To MainPage</button>
          
    </div>
  )
}

export default Home;
