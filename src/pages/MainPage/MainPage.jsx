import React from 'react'
import { TagProvider } from '../../components/lib/TagContext'
import Calendar from '../../components/MyCalendar/Calendar'
import Header from'../../components/MyCalendar/Header/Header'
import SideBar from '../../components/SideBar/SideBar'
const MainPage = () => {
  return (
    <div>
        <Header></Header>
        <TagProvider>

          <div className="flex justify-around">
              
                <SideBar></SideBar>
                <Calendar ></Calendar>
              
          </div>
        </TagProvider>
    </div>
  )
}

export default MainPage
