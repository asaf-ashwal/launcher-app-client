import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router";
import {useUserinfo} from "../../hooks/useUserInfo";
import "./style.css";

function index() {
  const [message, setMessage] = useState({message: "", class: ""});

  const token = useUserinfo((state) => state.token);
  const user = useUserinfo((state) => state.user);
  const navigate = useNavigate();
  const [laucherData, setLaucherData] = useState({});
  let params = useParams();
  const id = params.laucherId;
  useEffect(() => {
    async function getData() {
      try {
        const {data} = await axios.get(
          `http://localhost:3000/api/launchers/${id}`,
          {headers: {token}},
        );
        setLaucherData(data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  async function handleDelete(e) {
    try {
      await axios.delete(`http://localhost:3000/api/launchers/${id}`, {
        headers: {token},
      });
      navigate("/seeLaunchers");
    } catch (error) {
      setMessage({class: "form-error", message: error.message});
      setTimeout(() => {
        setMessage({message: "", class: ""});
      }, 4000);
    }
  }
  async function handleDestroyed(e) {
    try {
      console.log(token);
      await axios.put(
        `http://localhost:3000/api/launchers/destroyed/${id}`,
        {},
        {
          headers: {token},
        },
      );
      setMessage({class: "good", message: "Update True"});
      setTimeout(() => {
        setMessage({message: "", class: ""});
      }, 4000);
    } catch (error) {
      setMessage({class: "form-error", message: error.message});
      setTimeout(() => {
        setMessage({message: "", class: ""});
      }, 4000);
    }
  }
  return (
    <section className="form-section">
      <section className="laucher-page">
        <h1>laucher name:{laucherData.name}</h1>
        <p>Id: {laucherData.id}</p>
        <p>City: {laucherData.city}</p>
        <p>rocketType: {laucherData.rocketType}</p>
        <p>latitude: {laucherData.latitude}</p>
        <p>longitude: {laucherData.longitude}</p>
        {(user?.user_type === "admin" || user?.user_type === "airForce") && (
          <button onClick={handleDestroyed}>destroyed</button>
        )}
        {(user?.user_type === "admin" || user?.user_type === "modiin") && (
          <>
            <Link to={`/update/${laucherData.id}`}>
              <button>update laucher</button>
            </Link>
            <button onClick={handleDelete}>Delete laucher</button>
          </>
        )}
        {message.message && <p className={message.class}>{message.message}</p>}
      </section>
    </section>
  );
}

export default index;
