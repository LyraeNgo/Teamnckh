import { useState } from "react";

const Tagging = () => {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    if (newTag.trim() !== "") {
      setTags([...tags, { id: Date.now(), name: newTag }]);
      setNewTag("");
    }
  };

  return (
    <div className="p-4 bg-gray-100 h-screen w-64">
      <h2 className="text-xl font-bold mb-4">Tags</h2>

      {/* Tag Input */}
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="New tag"
          className="p-2 border rounded w-full"
        />
        <button onClick={addTag} className="bg-blue-500 text-white p-2 rounded">
          Add
        </button>
      </div>

      {/* Tags List */}
      <ul>
        {tags.map((tag) => (
          <li key={tag.id} className="p-2 bg-blue-200 rounded mb-2">
            {tag.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tagging;
