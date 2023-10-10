import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import VideoDetail from "./Pages/VideoDetail.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<App></App>}></Route>
        <Route path="/Home" exact element={<App></App>}></Route>
        <Route
          path="/VideoDetail"
          exact
          element={<VideoDetail></VideoDetail>}
        ></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
