import React from 'react'

const NavBar = (props) => {
  return (
    <div className="h-20 flex justify-between bg-green-700 rounded-md">
      <img src="public/Logo.png" alt="" className='p-5 border rounded-[40px]'/>
      <div className="p-5">{props.children}</div>
    </div>
  )
}

export default NavBar
