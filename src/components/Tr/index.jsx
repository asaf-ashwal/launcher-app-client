import React from "react";
import {Link} from "react-router";
import "./style.css";

function index({data, text, func}) {
  return (
    <tr>
      {Object.values(data).map((v, i) => (
        <td>{`${v}`}</td>
      ))}
      <td>
        <button onClick={() => func(data.id)}>{text}</button>
      </td>
    </tr>
  );
}

export default index;
