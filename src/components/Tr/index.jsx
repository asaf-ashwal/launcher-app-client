import React from "react";
import {Link} from "react-router";
import "./style.css";

function index({data, text, func}) {
  // const {id, city, rocketType, latitude, longitude, name} = laucher;

  return (
    <tr>
      {Object.values(data).map((v, i) => {
        // console.log(i);

        return <td>{`${v}`}</td>;
      })}
      <td>
        <button onClick={() => func(data.id)}>{text}</button>
      </td>
    </tr>
  );
}

export default index;
