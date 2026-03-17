import React, {useRef, useState} from "react";
import InputAndLable from "../../components/InputAndLable/index";
import axios from "axios";
import {useUserinfo} from "../../hooks/useUserInfo";

function index() {
  const [message, setMessage] = useState({class: "", message: ""});
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const user_typeRef = useRef(null);
  const {token} = useUserinfo();

  async function handlesubmit(e) {
    try {
      e.preventDefault();
      const newUser = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        email: emailRef.current.value,
        user_type: user_typeRef.current.value,
      };
      await axios.post(
        "http://localhost:3000/api/auth/register/create",
        newUser,
        {headers: {token}},
      );
      setMessage({class: "good", message: "laucher added secssasfuly"});
      setTimeout(() => {
        setMessage({message: "", class: ""});
      }, 4000);
    } catch (error) {
      console.error(error.message);
      setMessage({class: "form-error", message: error.message});
      setTimeout(() => {
        setMessage({message: "", class: ""});
      }, 4000);
    }
  }
  return (
    <section className="form-section">
      <form onSubmit={handlesubmit}>
        <h2>Sign User</h2>
        <InputAndLable
          message={"Enter username..."}
          name={"username"}
          ref={usernameRef}
        />
        <InputAndLable
          message={"Enter password..."}
          name={"password"}
          ref={passwordRef}
        />
        <InputAndLable
          message={"Enter email..."}
          name={"email"}
          ref={emailRef}
        />
        <InputAndLable
          message={"Enter user type..."}
          name={"user_type"}
          ref={user_typeRef}
        />
        <button type="submit">Subnit</button>
      </form>
      {message.message && <p className={message.class}>{message.message}</p>}
    </section>
  );
}

export default index;
