import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {useUserinfo} from "../../hooks/useUserInfo";
import axios from "axios";

function index() {
  let navigate = useNavigate();
  let params = useParams();
  const id = params.id;
  const token = useUserinfo((state) => state.token);
  const [message, setMessage] = useState({
    class: "",
    message: "",
  });
  const [formData, setFormData] = useState({});

  useEffect(() => {
    async function getData() {
      try {
        const {data} = await axios.get(`http://localhost:3000/api/auth/${id}`, {
          headers: {token},
        });
        if (!data) navigate("errorPage");
        setFormData(data);
      } catch (error) {
        console.log(error.message);
        setMessage({class: "form-error", message: error.message});
        setTimeout(() => {
          setMessage({message: "", class: ""});
        }, 4000);
      }
    }
    getData();
  }, []);
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      await axios.put(
        `http://localhost:3000/api/auth/register/update/${id}`,
        formData,
        {
          headers: {token},
        },
      );
      setMessage({class: "good", message: "laucher added secssasfuly"});
      setTimeout(() => {
        setMessage({message: "", class: ""});
      }, 4000);
    } catch (error) {
      console.log(error.message);
      setMessage({class: "form-error", message: error.message});
      setTimeout(() => {
        setMessage({message: "", class: ""});
      }, 4000);
    }
  }

  return (
    <section className="lacher-page">
      <form onSubmit={handleSubmit}>
        <h1>User Page</h1>
        <label>
          username:
          <input
            value={formData?.username}
            onChange={(e) =>
              setFormData({...formData, username: e.target.value})
            }
            type="text"
          />
        </label>
        <label>
          password:
          <input
            value={formData?.password}
            onChange={(e) =>
              setFormData({...formData, password: e.target.value})
            }
            type="text"
          />
        </label>
        <label>
          email:
          <input
            value={formData?.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            type="text"
          />
        </label>
        <label>
          user_type:
          <input
            value={formData?.user_type}
            onChange={(e) =>
              setFormData({...formData, user_type: e.target.value})
            }
            type="text"
          />
        </label>

        <button type="submit">Submit changes</button>
        {message.message && <p className={message.class}>{message.message}</p>}
      </form>
    </section>
  );
}

export default index;
