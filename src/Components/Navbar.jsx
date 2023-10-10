import React, { useState } from "react";
import "./styles/Navbar.css";
import { logo_URL, user_icon_URL } from "../Constants";

function Navbar({ query, setquery, limit, setLimit }) {
  const handleChange = (e) => {
    setquery(() => {
      return e.target.value;
    });
  };

  return (
    <div className="navComponent-container">
      <div className="navbar-container">
        <section className="logoIcon-container">
          <img src={logo_URL} className="logoIcon"></img>
          <p className="logoText">Social Boat</p>
        </section>
        <section className="searchBar-container">
          <input
            placeholder="Add Your Search Query Here"
            className="searchBar"
            type="text"
            value={query}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </section>
        <section className="userIcon-container">
          <img src={user_icon_URL} className="userIcon" alt="" />
          <p className="userName">UserName</p>
        </section>
      </div>
    </div>
  );
}

export default Navbar;
