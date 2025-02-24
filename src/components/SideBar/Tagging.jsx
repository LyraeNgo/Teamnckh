import { useState } from "react";
import dayjs from "dayjs";
const Tagging = () => {
  const [isEventModalOpen, setEventModalOpen] = useState(false);
  const [isTagModalOpen, setTagModalOpen] = useState(false);
  const [event, setEvent] = useState({
    title: "Meeting with Team",
    date: "",
    tags: [{ name: "Work", color: "#FF5733" }],
  });

  const [newTag, setNewTag] = useState("");
  const [newColor, setNewColor] = useState("#3498db");

  const addTag = () => {
    if (newTag.trim() !== "" && !event.tags.some((tag) => tag.name === newTag)) {
      setEvent((prevEvent) => ({
        ...prevEvent,
        tags: [...prevEvent.tags, { name: newTag, color: newColor }],
      }));
      setNewTag("");
      setNewColor("#3498db");
      setTagModalOpen(false);
    }
  };

  return (
    <div className="p-4">
      {/* Button to Open Event Modal */}
      <button
        onClick={() => setEventModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Open Event
      </button>

      {/* Event Pop-up Modal */}
      {isEventModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-96">
            <h2 className="text-lg  font-bold">TAGS</h2>

            {/* Display Tags */}
            <div className="mt-2 flex flex-wrap">
              {event.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded text-white mr-2"
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.name}
                </span>
              ))}
            </div>

            {/* Add More Tags */}
            <button
              onClick={() => setTagModalOpen(true)}
              className="text-blue-500 rounded-lg mt-2 p-2 w-[90%]" 
            >
              Adds
            </button>

            {/* Close Button */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setEventModalOpen(false)}
                className="bg-gray-400 px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Small Tag Modal Inside Event Pop-up */}
      {isTagModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-4 rounded-lg shadow-lg w-64">
            <h3 className="text-lg font-bold">Add Tag</h3>
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Enter tag name"
              className="border p-2 w-[90%] rounded mt-2"
            />

            {/* Color Picker */}
            <div className="mt-2 flex items-center">
              <label className="mr-2">Color:</label>
              <input
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="w-10 h-10 p-1 rounded border"
              />
            </div>

            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={addTag} className="bg-blue-500 text-white px-4 py-2 rounded">
                Save
              </button>
              <button onClick={() => setTagModalOpen(false)} className="bg-gray-300 px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tagging;
