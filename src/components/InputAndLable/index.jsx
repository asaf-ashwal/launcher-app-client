import React from "react";

function index({name, ref,message}) {
  return (
    <label htmlFor={name}>
      {name}:
      <input
        required
        ref={ref}
        id={name}
        type="text"
        placeholder={message}
      />
    </label>
  );
}

export default index;
