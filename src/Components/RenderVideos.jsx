import React, { useEffect, useState } from "react";
import VideoFrame from "./VideoFrame";
import { v4 as uuidv4 } from "uuid";
import "./styles/RenderVideos.css";

function RenderVideos({ AllVideos, FilteredVideos, FilterTag }) {
  const [filteredVideos, setFilteredVideos] = useState([]);

  useEffect(() => {
    let val = [];
    const TrueTags = Object.keys(FilterTag).filter((key) => FilterTag[key]);
    TrueTags.forEach((data) => {
      val = [...val, ...FilteredVideos.get(data)];
    });

    setFilteredVideos(val || []); // Set default empty array if undefined
  }, [FilterTag, FilteredVideos]);

  const videosToRender = filteredVideos.length > 0 ? filteredVideos : AllVideos;

  return (
    <div className="videosContainer">
      {videosToRender.map((data) => (
        <VideoFrame key={uuidv4()} {...data} />
      ))}
    </div>
  );
}

export default RenderVideos;
