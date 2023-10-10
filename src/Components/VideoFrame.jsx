import React from "react";
import "./styles/VideoFrame.css";
import Tag from "./Tag";
import { v4 as uuidv4 } from "uuid";

function VideoFrame({ heading, tags, text, video }) {
  return (
    <div className="videoContainer">
      <div className="heading">
        <span className="helperText">Heading: </span>
        {heading.length > 30 ? heading.slice(0, 30) + "..." : heading}
      </div>
      <div className="text">
        <span className="helperText">Text: </span>
        {text.slice(0, 30) + "..."}
      </div>
      <div className="tags">
        {tags?.map((val) => {
          return <Tag key={uuidv4()} data={val}></Tag>;
        })}
      </div>
      <div>
        <span className="helperText">Video: </span>
        <a href={video} className="video">
          {video.slice(0, 30) + "..."}
        </a>
      </div>
    </div>
  );
}

export default VideoFrame;
