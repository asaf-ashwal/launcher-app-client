import React from "react";
import {Link} from "react-router";
import "./style.css";

function index({laucher}) {
  const {id, city, rocketType, latitude, longitude, name} = laucher;

  return (
    <tr>
      <td>{id}</td>
      <td>{city}</td>
      <td>{rocketType}</td>
      <td>{latitude}</td>
      <td>{longitude}</td>
      <td>{name}</td>
      <td>
        <Link to={`/${id}`}>
          <button>nviget to lacher</button>
        </Link>
      </td>
    </tr>
  );
}

export default index;
