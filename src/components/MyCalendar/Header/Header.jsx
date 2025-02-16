import React from 'react'
import LeftSide from './LeftSide'
import RightSide from './RightSide'

const Header = () => {
  return (
    <div className='heading flex justify-between items-center bg-blue-100  m-5'>
      <LeftSide></LeftSide>
      <RightSide></RightSide>
    </div>
  )
}

export default Header
