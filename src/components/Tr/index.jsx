import React from "react";
import {Link} from "react-router";
import "./style.css";

function index({data,text ,func}) {
  // const {id, city, rocketType, latitude, longitude, name} = laucher;

  return (
    <tr>
      {Object.values(data).map((v) => (
        <td>{v}</td>
      ))}
      {/* <td>{id}</td>
      <td>{city}</td>
      <td>{rocketType}</td>
      <td>{latitude}</td>
      <td>{longitude}</td>
      <td>{name}</td> */}
      <td>
        {/* <Link to={`/${data.id}`}> */}
          <button onClick={()=>func(data.id)}>{text}</button>
        {/* </Link> */}
      </td>
    </tr>
  );
}

export default index;
