import React from 'react'

const NavBar = (props) => {
  return (
    <>
      <div className="max-h-7">
        <div className="navbar--logo">
          <img src="public/vite.svg" alt="" />
        </div>
        <div className="justify-center">{props.children}</div>
      </div>
    </>
  )
}

export default NavBar
