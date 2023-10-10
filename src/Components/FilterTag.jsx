import React, { useEffect } from "react";
import "./styles/FilterTag.css";

function FilterTag({ uniqueTags, setUniqueTags }) {

  const handleClick = (key) => {
    setUniqueTags((prevData) => {
      const updatedTags = { ...prevData };
      updatedTags[key] = !updatedTags[key];
      return updatedTags;
    });
  };
  return (
    <div className="filterTags-container">
      {Object.keys(uniqueTags).map((data) => {
        const tagClassName = uniqueTags[data] ? 'tagContainer active' : 'tagContainer';
        return (
          <div onClick={() => handleClick(data)} className={tagClassName}>
            <div className="tag">{data}</div>
          </div>
        );
      })}
    </div>
  );
  
}

export default FilterTag;
