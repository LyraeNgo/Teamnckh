import React from 'react'
import Calendar from '../../components/MyCalendar/Calendar'
import Header from'../../components/MyCalendar/Header/Header'
import SideBar from '../../components/SideBar/SideBar'
const MainPage = () => {
  return (
    <div>
        <Header></Header>
        <div className="flex justify-around">
            
              <SideBar></SideBar>
            
            

              <Calendar ></Calendar>
            
        </div>
    </div>
  )
}

export default MainPage
