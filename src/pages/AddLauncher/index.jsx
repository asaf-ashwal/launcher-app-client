import React, {useRef, useState} from "react";
import "./style.css";
import axios from "axios";
import {Link, useNavigate} from "react-router";
import InputAndLable from "../../components/InputAndLable/index";
import {useUserinfo} from "../../hooks/useUserInfo";

function index() {
  const cityRef = useRef(null);
  const rocketTypeRef = useRef(null);
  const latitudeRef = useRef(null);
  const longitudeRef = useRef(null);
  const nameRef = useRef(null);
  const [message, setMessage] = useState({message: "", class: ""});
  const token = useUserinfo((state) => state.token);
  async function handlesubmit(e) {
    try {
      e.preventDefault();
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
        {headers: {token}},
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
      console.error(error.message);
      setMessage({class: "form-error", message: error.message});
      setTimeout(() => {
        setMessage({message: "", class: ""});
      }, 4000);
    }
  }

  return (
    <>
     
      <section className="form-section">
        <form onSubmit={handlesubmit}>
          <h2>Add laucher</h2>
          <select ref={rocketTypeRef}>
            <option value="Kheibar">Kheibar</option>
            <option value="Radwan">Radwan</option>
            <option value="Fetah110">Fetah110</option>
            <option value="Shahab3">Shahab3</option>
          </select>

          <InputAndLable
            message={"Enter city..."}
            name={"city"}
            ref={cityRef}
          />
          <InputAndLable
            message={"Enter latitude..."}
            name={"latitude"}
            ref={latitudeRef}
          />
          <InputAndLable
            message={"Enter longitude..."}
            name={"longitude"}
            ref={longitudeRef}
          />
          <InputAndLable
            message={"Enter name..."}
            name={"name"}
            ref={nameRef}
          />

          <button type="submit">Submit</button>
        </form>
        {message.message && <p className={message.class}>{message.message}</p>}
      </section>
    </>
  );
}

export default index;
