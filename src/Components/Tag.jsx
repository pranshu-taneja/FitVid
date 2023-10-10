import React from "react";
import "./styles/Tag.css";

function Tag({ data }) {
  return <div className="singleTagContainer">
      <div className="singleTag">{data}</div>
  </div>;
}

export default Tag;
