import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import "./App.css";
import FilterTag from "./Components/FilterTag";
import RenderVideos from "./Components/RenderVideos";

function App() {
  const [query, setquery] = useState("");
  const [videos, setVideos] = useState([]);
  const [limit, setLimit] = useState(20);
  const [isLoading, setisLoading] = useState(false);
  const [uniqueTags, setUniqueTags] = useState([]);
  const [tagVideoMap, setTagVideoMap] = useState(new Map());

  const removeDuplicateTags = (arr) => {
    let Temp = {};
    let uniqueArr = arr.filter((item) => {
      return Temp.hasOwnProperty(item) ? false : (Temp[item] = true);
    });
    return uniqueArr;
  };

  const extractUniqueTags_plain = (data) => {
    const uniqueTagsMap = {};

    data.forEach((video) => {
      video.tags.forEach((tag) => {
        uniqueTagsMap[tag] = false;
      });
    });
    setUniqueTags(uniqueTagsMap); // Update t
  };

  useEffect(() => {
    const newTagVideoMap = new Map();

    videos.forEach((video) => {
      let wdup_tags = removeDuplicateTags(video.tags);
      wdup_tags.forEach((tag) => {
        if (!newTagVideoMap.has(tag)) {
          newTagVideoMap.set(tag, []);
        }
        newTagVideoMap.get(tag).push(video);
      });
    });

    setTagVideoMap(newTagVideoMap);
  }, [videos]);

  useEffect(() => {
    if (query.length === 0) {
      setVideos([]);
      setUniqueTags([]);
      setisLoading(false);
      return;
    }

    let latestQuery = query;
    let fetchTimeout;

    const fetchVideos = async () => {
      try {
        setisLoading(true);
        const apiUrl = `https://asia-south1-socialboat-dev.cloudfunctions.net/assignmentVideos?q=${query}&numResults=${limit}`;
        const response = await fetch(apiUrl);

        if (response.status === 505) {
          //Hanlding a common error coming from server (handling server busy)
          throw new Error("HTTP version not supported");
        }

        const data = await response.json();

        if (latestQuery === query) {
          setVideos(data.results);
          setisLoading(false);
          extractUniqueTags_plain(data.results);
        }
      } catch (error) {
        if (error.message === "HTTP version not supported") {
          fetchTimeout = setTimeout(fetchVideos, 500);
        } else {
          console.error("Error fetching videos:", error);
          setisLoading(false);
        }
      }
    };

    clearTimeout(fetchTimeout);

    fetchTimeout = setTimeout(fetchVideos, 300);

    return () => {
      clearTimeout(fetchTimeout);
      latestQuery = null;
    };
  }, [query, limit]);

  return (
    <div className="mainContainer">
      <Navbar
        query={query}
        setquery={setquery}
        limit={limit}
        setLimit={setLimit}
      />
      <FilterTag
        uniqueTags={uniqueTags}
        setUniqueTags={setUniqueTags}
      ></FilterTag>

      <div className="RenderVideos-Container">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <RenderVideos
            AllVideos={videos}
            FilteredVideos={tagVideoMap}
            FilterTag={uniqueTags}
          ></RenderVideos>
        )}
      </div>
    </div>
  );
}

export default App;
