import { useContext } from "react";
import { TagContext } from "../lib/TagContext.jsx";

const Tagging = () => {
  const { defaultTags } = useContext(TagContext);
  
  return (
    <div>
      <h2>Tags:</h2>
      <ul>
        {defaultTags.map((tag, index) => (
          <li key={index} style={{ color: tag.color }}>{tag.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tagging;