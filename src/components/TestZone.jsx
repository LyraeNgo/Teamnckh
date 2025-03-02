import React, { useState } from "react";

const TestZone = () => {
  const [arr, setArr] = useState([
    { name: "work", color: "red" },
    { name: "meeting", color: "blue" },
    { name: "importance", color: "yellow" },
    { name: "playing", color: "green" },
  ]);

  const [input, setInput] = useState("");
  const [colorTag, setColorTag] = useState("#000000");
  const [showb, setShowb] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const inpItem = arr.map((element) => (
    <option key={element.name} value={element.name}>
      {element.name}: {element.color}
    </option>
  ));

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleColorTag = (event) => {
    setColorTag(event.target.value);
  };

  const addItem = () => {
    if (input.trim() === "") return;

    const tagExists = arr.some(
      (tag) => tag.name.toLowerCase() === input.toLowerCase()
    );

    if (tagExists) {
      alert("Tag already exists!");
      return;
    }

    setArr([...arr, { name: input, color: colorTag }]);
    setInput("");
    setColorTag("#000000");
    setShowb(false);
    setSelectedValue(""); // Reset select dropdown
  };

  return (
    <div className="p-4">
      <label className="block text-lg font-semibold mb-2">Select a Tag</label>
      <select
        value={selectedValue}
        onChange={(e) => {
          setSelectedValue(e.target.value);
          if (e.target.value === "add new") setShowb(true);
        }}
        className="border p-2 rounded"
      >
        {inpItem}
        <option value="add new">+ Add New Tag</option>
      </select>

      {showb && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-bold mb-4">Create a New Tag</h2>
            <label className="block mb-2">Tag Name</label>
            <input
              type="text"
              onChange={handleInput}
              value={input}
              className="border p-2 w-full mb-4 rounded"
            />
            <label className="block mb-2">Tag Color</label>
            <input
              type="color"
              onChange={handleColorTag}
              value={colorTag}
              className="w-full mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={addItem}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add
              </button>
    
              <button
                onClick={() => setShowb(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestZone;
