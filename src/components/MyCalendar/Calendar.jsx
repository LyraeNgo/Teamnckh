import { useState } from "react";
//  npm install dayjs
// install taiwind
import dayjs from "dayjs";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs()); // Current month state

  const [clickedDate, setClickedDate] = useState(null); // Track selected date

  const [events, setEvents] = useState({}); // Store multiple events per date


  // adding the event by using the Function AddEvent below
  const [showModal, setShowModal] = useState(false); // Control modal visibility

  const [newEvent, setNewEvent] = useState(""); // Store new event text


  // Navigate between months
  const goToNextMonth = () => setCurrentDate(currentDate.add(1, "month"));
  const goToPrevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));

  // Click on a date: select it & open the event modal
  const handleClickedDate = (day) => {
    if (day) {
      setClickedDate(currentDate.date(day));
      setShowModal(true); // Show the event modal
    }
  };

  // Add event to the selected date
  const addEvent = () => {
    // break condition and when user type nothing
    if (!clickedDate || newEvent.trim() === "") return;

    setEvents((prev) => ({
      ...prev, // keep all the previous events
      [clickedDate.format("YYYY-MM-DD")]: [
        ...(prev[clickedDate.format("YYYY-MM-DD")] || []), // Keep existing events
        newEvent,
      ],
    }));

    setNewEvent(""); // Clear input
    setShowModal(false); // Close modal
  };

  // Delete event from the date
  const deleteEvent = (date, index) => {
    setEvents((prev) => {
      const updatedEvents = [...prev[date]];
      updatedEvents.splice(index, 1); // Remove event by index

      return {
        ...prev,
        [date]: updatedEvents.length ? updatedEvents : undefined, // Remove key if empty
      };
    });
  };

  // Generate calendar grid
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDay = startOfMonth.day();
  const endDay = endOfMonth.day();
  const today=dayjs();//today

  // Empty cells before the first day
  let days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null); 
  }

  // Fill days of the month
  for (let i = 1; i <= endOfMonth.date(); i++) {
    days.push(i); 
  }

  // Empty cells after the last day
  for (let i = endDay; i < 6; i++) {
    days.push(null); 
  }
  // SHOW
  return (
    <div className="max-w-[80%] mt-2 min-w-[80%] p-4 bg-green-300 shadow-lg rounded-lg">
      {/* Header: Month Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToPrevMonth} className="p-2 bg-gray-300 rounded">&lt;</button>
        <h2 className="text-2xl font-bold">{currentDate.format("MMMM YYYY")}</h2>
        <button onClick={goToNextMonth} className="p-2 bg-gray-300 rounded">&gt;</button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 text-center font-bold text-xl font-sans ">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="p-2">{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 font-sans">
        {days.map((day, index) => {
          const dateKey = day ? currentDate.date(day).format("YYYY-MM-DD") : null;
          const isToday = dateKey === today.format("YYYY-MM-DD");

          return (
            <div
              key={index}
              onClick={() => handleClickedDate(day)}
              className={`p-4 text-center rounded-[5px] h-20 cursor-pointer 
                ${day ? (isToday ? "bg-red-400 text-white font-bold" : "bg-white hover:bg-blue-200") : "bg-white bg-opacity-50"}
              `}
            >
              {day}
              
              {/* Show events if exist */}
              {events[dateKey] &&
                events[dateKey].map((event, eventIndex) => (
                  <div key={eventIndex} className=" mt-1 bg-gray-200 p-1 rounded-md text-sm flex justify-between">
                    <span>{event}</span>
                    {/* delete event */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent opening modal
                        deleteEvent(dateKey, eventIndex);
                      }}
                      className="text-black  ml-2 rounded-md border-0 "
                    >
                      &#x00d7;
                    </button>
                  </div>
                ))}
            </div>
          );
        })}
      </div>

      {/* Modal for Adding Events */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-96 h-[200px]">
            <h3 className="text-lg font-bold mb-2 ">Add Event for {clickedDate?.format("MMMM DD, YYYY")}</h3>
            <input
              type="text"
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
              placeholder="Enter event..."
              className="w-[90%] p-2 border rounded mb-2  "
            />
            <div className="flex justify-end gap-2 ">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={addEvent} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
