import React, {useRef, useState} from "react";
import "./style.css";
import axios from "axios";
import {Link} from "react-router";

function index() {
  const cityRef = useRef(null);
  const rocketTypeRef = useRef(null);
  const latitudeRef = useRef(null);
  const longitudeRef = useRef(null);
  const nameRef = useRef(null);
  const [message, setMessage] = useState({message: "", class: ""});

  async function handlesubmit(e) {
    try {
      e.preventDefault();
      // console.log('satar');

      const formData = {
        city: cityRef.current.value,
        rocketType: rocketTypeRef.current.value,
        latitude: latitudeRef.current.value,
        longitude: longitudeRef.current.value,
        name: nameRef.current.value,
      };
      const {status} = axios.post(
        "http://localhost:3000/api/launchers",
        formData,
      );
      setMessage({class: "good", message: "laucher added secssasfuly"});
      setTimeout(() => {
        setMessage({message: "", class: ""});
      }, 4000);
      cityRef.current.value = "";
      rocketTypeRef.current.value = "Kheibar";
      latitudeRef.current.value = "";
      longitudeRef.current.value = "";
      nameRef.current.value = "";
    } catch (error) {
      setMessage({class: "form-error", message: error.message});
      setTimeout(() => {
        setMessage({message: "", class: ""});
      }, 4000);
    }
  }

  return (
    <>
      <Link to="/">
        <button className="home-butt"> Back home</button>
      </Link>
      <section className="form-section">
        <form onSubmit={handlesubmit}>
          <h2>Add laucher</h2>
          <select ref={rocketTypeRef}>
            <option value="Kheibar">Kheibar</option>
            <option value="Radwan">Radwan</option>
            <option value="Fetah110">Fetah110</option>
            <option value="Shahab3">Shahab3</option>
          </select>
          <label htmlFor="city">
            city:
            <input
              required
              ref={cityRef}
              id="city"
              type="text"
              placeholder="Enter city..."
            />
          </label>

          <label htmlFor="latitude">
            latitude:
            <input
              required
              ref={latitudeRef}
              min={0}
              id="latitude"
              type="number"
              placeholder="Enter latitude..."
            />
          </label>

          <label htmlFor="longitude">
            longitude:
            <input
              required
              ref={longitudeRef}
              min={0}
              id="longitude"
              type="number"
              placeholder="Enter longitude..."
            />
          </label>

          <label htmlFor="name">
            name:
            <input
              required
              ref={nameRef}
              id="name"
              type="text"
              placeholder="Enter name..."
            />
          </label>

          <button type="submit">Submit</button>
        </form>
        {message.message && <p className={message.class}>{message.message}</p>}
      </section>
    </>
  );
}

export default index;
