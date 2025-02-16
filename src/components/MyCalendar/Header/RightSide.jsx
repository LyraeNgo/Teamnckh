import React from 'react'


const RightSide = () => {
  return (
    <div className='RightSide-container flex flex-row-reverse p-10  ' >
      <div className="profile w-10 h-10 bg-gray-500 border border-black border-solid rounded-[50px] mr-5 ">
        prof
      </div>
      <div className="notify w-10 h-10 bg-yellow-300 border border-black border-solid rounded-[50px] mr-5">
        <h6>Bell</h6>
      </div>
      <div className="message w-10 h-10 bg-white-300 border border-black border-solid rounded-[50px] mr-5 ">
        <h6>mess</h6>
      </div>
    </div>
  )
}

export default RightSide
