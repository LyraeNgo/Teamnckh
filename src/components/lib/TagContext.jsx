import { createContext, useState } from "react";

export const TagContext = createContext();

export const TagProvider = ({ children }) => {
  const [defaultTags, setDefaultTags] = useState([
    { name: "Work", color: "#FF5733" },
    { name: "Personal", color: "#33FF57" },
    { name: "Meeting", color: "#3357FF" },
  ]);

  // Function to add a new tag globally
  const addTag = (name, color) => {
    setDefaultTags((prevTags) => [...prevTags, { name, color }]);
  };

  return (
    <TagContext.Provider value={{ defaultTags, setDefaultTags, addTag }}>
      {children}
    </TagContext.Provider>
  );
};
