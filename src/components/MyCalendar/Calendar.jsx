import { useState } from "react";
//  npm install dayjs
// install taiwind
import dayjs from "dayjs";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs()); // Current month state

  const [clickedDate, setClickedDate] = useState(null); // Track selected date

  const [events, setEvents] = useState({}); // Store multiple events per date

  const [newEventTime, setNewEventTime] = useState("");
  // adding the event by using the Function AddEvent below
  const [showModal, setShowModal] = useState(false); // Control modal visibility

  const [newEvent, setNewEvent] = useState(""); // Store new event text

  const [newEventDescription, setNewEventDescription] = useState(""); // Store event description

  const [editingEvent, setEditingEvent] = useState(null); // Track which event is being edited
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
    // Check if there is no event name or clicked date
    if (!clickedDate || newEvent.trim() === "") return;
  
    const eventDate = clickedDate.format("YYYY-MM-DD");
    
    if (editingEvent) {
      // Editing an existing event
      setEvents((prev) => {
        const updatedEvents = prev[eventDate].map((event, index) => {
          // Find the event being edited and update it
          if (index === editingEvent.index) {
            return {
              ...event,
              event: newEvent,
              time: newEventTime,
              description: newEventDescription, // Update the description
            };
          }
          return event;
        });
  
        return {
          ...prev,
          [eventDate]: updatedEvents,
        };
      });
  
      setEditingEvent(null); // Reset editing state after saving
    } else {
      // Adding a new event
      setEvents((prev) => ({
        ...prev,
        [eventDate]: [
          ...(prev[eventDate] || []),
          { event: newEvent, time: newEventTime, description: newEventDescription },
        ],
      }));
    }
  
    // Reset all inputs and close the modal
    setNewEvent("");
    setNewEventTime("");
    setNewEventDescription("");
    setShowModal(false);
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

  const handleClickedEvent = (event, eventIndex) => {
    setNewEvent(event.event); // Set the current event name
    setNewEventTime(event.time); // Set the current event time
    setNewEventDescription(event.description || ""); // Set the current event description
    
    setEditingEvent({ index: eventIndex, date: clickedDate.format("YYYY-MM-DD") }); // Mark event as being edited
    setShowModal(true); // Show modal for editing
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
    <div className="w-[100%] h-[89.5vh] my-0 min-w-[80%] p-4 pt-0 bg-blue-200 shadow-lg scr">
      {/* Header: Month Navigation */}
      <div className="flex justify-between items-center mb-0">
        <button onClick={goToPrevMonth} className="p-2 bg-gray-300 rounded">&lt;</button>
        <h2 className="text-2xl font-bold mb-0">{currentDate.format("MMMM YYYY")}</h2>
        <button onClick={goToNextMonth} className="p-2 bg-gray-300 rounded">&gt;</button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 text-center font-bold text-xl font-sans ">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="p-2">{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 auto-rows-fr gap-1 font-sans">
        {days.map((day, index) => {
          const dateKey = day ? currentDate.date(day).format("YYYY-MM-DD") : null;
          const isToday = dateKey === today.format("YYYY-MM-DD");

          return (
            <div
              key={index}
              onClick={() => handleClickedDate(day)}
              className={`p-4 text-center rounded-[5px] min-h-[60px] cursor-pointer 
                ${day ? (isToday ? "bg-red-400 text-white font-bold" : "bg-white hover:bg-blue-300 hover:bg-opacity-30") : "bg-white bg-opacity-50"}
              `}
            >
              {day}
              
              {/* Show events if exist */}
              {events[dateKey] &&
                events[dateKey].map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className="mt-1 bg-gray-200 p-1 rounded-md text-sm flex justify-between"
                    onClick={() => handleClickedEvent(event, eventIndex)} // Allow clicking to edit
                  >
                    <span>
                      {event.event} {event.time && `at ${event.time}`} {/* Render event and time */}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent opening modal
                        deleteEvent(dateKey, eventIndex);
                      }}
                      className="text-black ml-2 rounded-md border-0"
                    >
                      &#x00d7; {/* Delete button */}
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
        <div className="bg-white p-4 rounded-lg shadow-lg w-96 h-[300px]">
          <h3 className="text-lg font-bold mb-2">
            {editingEvent ? `Edit Event on ${clickedDate?.format("MMMM DD, YYYY")}` : `Add Event for ${clickedDate?.format("MMMM DD, YYYY")}`}
          </h3>
          
          {/* Event Name */}
          <input
            type="text"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            placeholder="Enter event name..."
            className="w-[90%] p-2 border rounded mb-2"
          />
          
          {/* Event Time */}
          <input
            type="time"
            value={newEventTime}
            onChange={(e) => setNewEventTime(e.target.value)} // Update time state
            className="w-[90%] p-2 border rounded mb-2"
          />
          
          {/* Event Description */}
          <textarea
            value={newEventDescription}
            onChange={(e) => setNewEventDescription(e.target.value)}
            placeholder="Enter event description..."
            className="w-[90%] p-2 border rounded mb-2"
            rows="4"
          />
          
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            <button onClick={addEvent} className="px-4 py-2 bg-blue-500 text-white rounded">
              {editingEvent ? "Save Changes" : "Save"}
            </button>
          </div>
        </div>
      </div>
    )}

    </div>
  );
};

export default Calendar;