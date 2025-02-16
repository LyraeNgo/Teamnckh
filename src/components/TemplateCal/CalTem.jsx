import { Calendar } from "antd";

import React from 'react'

const CalTem = () => {
  
    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
      };
      return (
        <div className="flex flex-row-reverse m-0 p">

        <Calendar  fullscreen={true} onPanelChange={onPanelChange} className="w-[85%] m-10 "/>
        </div>
      );
}

export default CalTem
