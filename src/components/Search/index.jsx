import React from "react";
import "./style.css";

function index({func, placeholder}) {
  return (
    <input className="input"
      type="text"
      placeholder={placeholder}
      onChange={(e) => func(e.target.value)}
    />
  );
}

export default index;
