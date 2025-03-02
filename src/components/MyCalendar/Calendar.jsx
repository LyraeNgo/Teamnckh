import { useState } from "react";
import dayjs from "dayjs";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  // keep days
  const [clickedDate, setClickedDate] = useState(null);
  // set event
  const [events, setEvents] = useState({});
  // set time
  const [newEventTime, setNewEventTime] = useState("");
  // show up modal
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState("");
  // set description
  const [newEventDescription, setNewEventDescription] = useState("");
  const [editingEvent, setEditingEvent] = useState(null); 
  // default tag



  const [defaultTags,setDefaultTag] =useState( [
    { name: "Work", color: "#FF5733" },
    { name: "Personal", color: "#33FF57" },
    { name: "Meeting", color: "#3357FF" },
  ]);
  // tags
  // store all tags in the <option>
  const [selectedTag, setSelectedTag] = useState(defaultTags[0]);
  const [tagName, setTagName]= useState("");
  const [tagColor,setTagColor]=useState("#000000");
  const [showTagModal,setShowTagModal]=useState(false);
  
  // FUNCTION ZONE -----------------------------------------------------------------------------------------//
  const inpItem=defaultTags.map((tags)=>{
    return<option key={tags.name}>{tags.name}</option>
  })

  const handleTagName=(e)=>{
    setTagName(e.target.value);
  }
  const handleTagColor=(e)=>{
    setTagColor(e.target.value);
  }

  const handleAddingTag=()=>{
    if(tagName.trim()==="")return;
    setDefaultTag((prev)=>[...prev,{name: tagName, color: tagColor}]);
    setSelectedTag({name: tagName, color: tagColor});
    setTagName("");
    setTagColor("#000000");
    setShowTagModal(false);
  }


  const goToNextMonth = () => setCurrentDate(currentDate.add(1, "month"));
  const goToPrevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));

  const handleClickedDate = (day) => {
    if (day) {
      setClickedDate(currentDate.date(day));
      setShowModal(true);
    }
  };
  //clickable to the day
  const addEvent = () => {
    if (!clickedDate || newEvent.trim() === "") return;

    const eventDate = clickedDate.format("YYYY-MM-DD");

    if (editingEvent) {
      setEvents((prev) => {
        const updatedEvents = prev[eventDate].map((event, index) =>
          index === editingEvent.index
            ? {
                ...event,
                event: newEvent,
                time: newEventTime,
                description: newEventDescription,
                tag: selectedTag, 
              }
            : event
        );

        return { ...prev, [eventDate]: updatedEvents };
      });

      setEditingEvent(null);
    } else {
      setEvents((prev) => ({
        ...prev,
        [eventDate]: [
          ...(prev[eventDate] || []),
          { event: newEvent, time: newEventTime, description: newEventDescription, tag: selectedTag }, 
        ],
      }));
    }

    setNewEvent("");
    setNewEventTime("");
    setNewEventDescription("");
    setSelectedTag("");
    setShowModal(false);
  };

  const deleteEvent = (date, index) => {
    setEvents((prev) => {
      const updatedEvents = [...prev[date]];
      updatedEvents.splice(index, 1);

      return { ...prev, [date]: updatedEvents.length ? updatedEvents : undefined };
    });
  };

  const handleClickedEvent = (event, eventIndex) => {
    setNewEvent(event.event);
    setNewEventTime(event.time);
    setNewEventDescription(event.description || "");
    setSelectedTag(event.tag || defaultTags[0]);
    setEditingEvent({ index: eventIndex, date: clickedDate.format("YYYY-MM-DD") });
    setShowModal(true);
  };


  

  // CALENDAR VARs
  const today = dayjs();
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDay = startOfMonth.day();
  const endDay = endOfMonth.day();
  // initialize days array
  let days = [];
  for (let i = 0; i < startDay; i++){
    days.push(null);
  }
  for (let i = 1; i <= endOfMonth.date(); i++){
    days.push(i);
  } 
  for (let i = endDay; i < 6; i++){
    days.push(null);
  }
  // returning---------------------------------------------//
  return (
    <div className="w-[90%] my-0 min-w-[80%] p-4 pt-0 bg-blue-200 shadow-lg">
      <div className="flex justify-between items-center mb-0">
        <button onClick={goToPrevMonth} className="p-2 bg-gray-300 rounded">&lt;</button>
        <h2 className="text-2xl font-bold mb-0 font-sans">{currentDate.format("MMMM YYYY")}</h2>
        <button onClick={goToNextMonth} className="p-2 bg-gray-300 rounded">&gt;</button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center font-bold text-xl font-sans">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="p-2 pt-0">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 auto-rows-fr gap-1 font-sans box-border">
        {days.map((day, index) => {
          const dateKey = day ? currentDate.date(day).format("YYYY-MM-DD") : null;
          const isToday = dateKey === today.format("YYYY-MM-DD");
          return (
            <div
              key={index}
              onClick={() => handleClickedDate(day)}
              className={`p-4 text-center rounded-[5px] min-h-[20px] h-[59px] cursor-pointer
                ${day ? (isToday ? "bg-red-400 text-white font-bold" : "bg-white hover:bg-blue-300 hover:bg-opacity-30") : "bg-white bg-opacity-50"}
              `}
            >

              {day}
              
              {events[dateKey] &&
                events[dateKey].map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className="mt-1 bg-gray-200 p-1 rounded-md text-sm flex justify-between w-full flex-col"
                    onClick={() => handleClickedEvent(event, eventIndex)}
                  >
                    <span className="px-3 py-1 rounded" style={{ backgroundColor: event.tag?.color }}></span>
                    <div>
                    <span>
                      {event.event} {event.time && `at ${event.time}`}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteEvent(dateKey, eventIndex);
                      }}
                      className="text-black ml-2 rounded-md border-0"
                    >
                      &#x00d7;
                    </button>
                    </div>
                  </div>
                ))}
            </div>
          );
        })}
      </div>
      
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-[400px] h-[300px]">
            <h3 className="text-xl font-bold mb-2 font-sans flex justify-center">
              {editingEvent ? `EDIT EVENT` : `ADD EVENT`}
            </h3>

            <input 
            type="text" 
            autoFocus 
            value={newEvent} 
            onChange={(e) => setNewEvent(e.target.value)} 
            placeholder="Event Name" 
            className="w-[95%] p-2  border rounded mb-2" />
            
            <div className="flex mb-2 "> 
            <input 
            type="time" 
            value={newEventTime} 
            onChange={(e) => setNewEventTime(e.target.value)} 
            className="w-[95%] p-2 border rounded mr-3" />

            <select onChange={(e)=>{
              if(e.target.value==="add new"){
                setShowTagModal(true)
              }else{
                const selected = defaultTags.find(tag => tag.name === e.target.value);
                setSelectedTag(selected);
              }
            }} value={selectedTag.name} className="rounded-lg">
               {inpItem}
              <option value="add new" className="bg-gray-400"> + Add New </option>
            </select>
            
            </div>
            
            {/* working place, stay faraway*/}
            <input type="radio"  className="mb-3"/>Notice me
            {/* */}

            <textarea 
            value={newEventDescription} 
            onChange={(e) => setNewEventDescription(e.target.value)} 
            placeholder="Description" 
            className="w-[95%]  p-2 border rounded mb-2 resize-none" rows="4" />

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={addEvent} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}

      {showTagModal && (
        <div className='bg-gray-300 inset-0 w-full flex items-center justify-center  fixed bg-opacity-20'>
          <div className="bg-white w-[30%] h-[50%] rounded-2xl mt-0 justify-center flex flex-col box-border  ">
            <h3 className="mx-[auto] font-sans text-2xl mt-0 ">ADD NEW TAG</h3>
            <div className="flex flex-col justify-center ">
              <p className="mx-[27%] mt-3 mb-0 font-bold font-sans">Name</p>
              <input type="text" onChange={handleTagName} maxLength={20} placeholder="tag name" className=" w-[50%] h-[30%] justify-center mx-[auto] border   rounded-md"/>
              

              <p className="mx-[27%] mt-3 mb-0  font-bold font-sans">Color</p>
              <input type="color"  onChange={handleTagColor} className="w-[20%]  h-9  mx-[24%] rounded-sm"/>
              
            </div>
            
            <div className="flex justify-evenly mt-12   ">

              <button onClick={handleAddingTag} className="w-[30%] h-10 rounded-lg bg-blue-600 text-white"> add</button>
              <button onClick={()=>setShowTagModal(false)} className="w-[30%] h-10 rounded-lg  bg-gray-500 text-white"> close</button>
              
            </div>
          </div>
        </div>)
      };
    </div>
    
  );
};

export default Calendar;
