import React from 'react'

const NavBar = (props) => {
  return (
    <nav className="h-20 flex justify-between bg-green-700 rounded-md">
      <img src="public/Logo.png" alt="" className='p-5 border rounded-[40px]'/>
      <div className="p-5">
      {React.Children.map(props.children, (child) =>
          React.isValidElement(child) 
            ? React.cloneElement(child, {
                className: `${child.props.className || ""} no-underline p-4 text-yellow-100`,
              })
            : child
        )}
      </div>
    </nav>
  )
}

export default NavBar
