import React, {useRef, useState} from "react";
import InputAndLable from "../../components/InputAndLable/index";
import {useUserinfo} from "../../hooks/useUserInfo";

function index() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [message, setMessage] = useState({message: "", class: ""});
  const setLogin = useUserinfo((state) => state.setLogin);

  function handlesubmit(e) {
    try {
      e.preventDefault();
      const formData = {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      };

      setLogin(formData, setMessage);
      usernameRef.current.value = "";
      passwordRef.current.value = "";
    } catch (error) {}
  }
  return (
    <section className="form-section">
      <form onSubmit={handlesubmit}>
        <h2>Login</h2>
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
        <button type="submit">Subnit</button>
        {message.message && <p className={message.class}>{message.message}</p>}
      </form>
    </section>
  );
}

export default index;
