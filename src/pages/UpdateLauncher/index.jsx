import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router";
import "./style.css";
import {useUserinfo} from "../../hooks/useUserInfo";

export default function index() {
  let navigate = useNavigate();
  const token = useUserinfo((state) => state.token);
  const [message, setMessage] = useState({
    class: "",
    message: "",
  });

  let params = useParams();
  const id = params.laucherId;
  const [laucherData, setLaucherData] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    async function getData() {
      try {
        const {data} = await axios.get(
          `http://localhost:3000/api/launchers/${id}`,
          {headers: {token}},
        );
        if (!data) navigate("errorPage");
        setLaucherData(data);
        setFormData(data);
      } catch (error) {
        console.log(error);
        navigate("/errorPage");
      }
    }
    getData();
  }, []);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      await axios.put(`http://localhost:3000/api/launchers/${id}`, formData, {
        headers: {token},
      });
    } catch (error) {
      setMessage({class: "form-error", message: error.message});
      setTimeout(() => {
        setMessage({message: "", class: ""});
      }, 4000);
    }
  }

  return (
    <section className="lacher-page">
      <form onSubmit={handleSubmit}>
        <h1>launcher page</h1>
        <label>
          city:
          <input
            value={formData?.city}
            onChange={(e) => setFormData({...formData, city: e.target.value})}
            type="city"
          />
        </label>
        <label>
          rocketType:
          <input
            value={formData?.rocketType}
            onChange={(e) =>
              setFormData({...formData, rocketType: e.target.value})
            }
            type="rocketType"
          />
        </label>
        <label>
          latitude:
          <input
            value={formData?.latitude}
            onChange={(e) =>
              setFormData({...formData, latitude: e.target.value})
            }
            type="latitude"
          />
        </label>
        <label>
          longitude:
          <input
            value={formData?.longitude}
            onChange={(e) =>
              setFormData({...formData, longitude: e.target.value})
            }
            type="longitude"
          />
        </label>
        <label>
          name:
          <input
            value={formData?.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            type="name"
          />
        </label>
        <button type="submit">Submit changes</button>
        {message.message && <p className={message.class}>{message.message}</p>}
      </form>
    </section>
  );
}
