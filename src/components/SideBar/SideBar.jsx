import React from 'react'
import CreateBtn from './CreateBtn'
import MiniCalendar from './MiniCalendar'
import Tagging from './Tagging'
const SideBar = () => {
  return (
    <div>
        <CreateBtn></CreateBtn>   
        <MiniCalendar></MiniCalendar>
        <Tagging></Tagging>
        
    </div>
  )
}

export default SideBar
