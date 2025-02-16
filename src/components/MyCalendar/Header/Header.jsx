import React from 'react'
import LeftSide from './LeftSide'
import RightSide from './RightSide'

const Header = () => {
  return (
    <div className='heading flex justify-between items-center h-[6vh] bg-green-100  m-0 '>
      <LeftSide></LeftSide>
      <RightSide></RightSide>
    </div>
  )
}

export default Header
