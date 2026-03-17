import React, {use, useEffect, useState} from "react";
import {useUserinfo} from "../../hooks/useUserInfo";
import Tr from "../../components/Tr/index";
import axios from "axios";
import {Link} from "react-router";

function index() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState({});
  const token = useUserinfo((state) => state.token);

  useEffect(() => {
    async function getData() {
      try {
        const {data} = await axios.get(
          "http://localhost:3000/api/auth/getAllUser",
          {headers: {token}},
        );
        setUsers(data);
        setMessage({class: "good", message: "laucher added secssasfuly"});
        setTimeout(() => {
          setMessage({message: "", class: ""});
        }, 4000);
      } catch (error) {
        console.log(error);
        // setErr(error.message);
      }
    }
    getData();
  }, []);

  async function handleDelete(id) {
    try {
      await axios.delete(
        `http://localhost:3000/api/auth/register/delete/${id}`,
        {headers: {token}},
      );
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <h1>users page</h1>
      <table>
        <tr>
          <th>id</th>
          <th>username</th>
          <th>password</th>
          <th>email</th>
          <th>user_type</th>
          <th>last_login</th>
          <th>update</th>
          <th>delete</th>
        </tr>
        {users.map((user) => {
          return (
            <Tr
              key={user.id}
              func={(id) => handleDelete(id)}
              data={{
                ...user,
                link: (
                  <Link to={`/updateUser/${user.id}`}>
                    <button>Update User</button>
                  </Link>
                ),
              }}
              text="Delete"
            />
          );
        })}
      </table>
    </>
  );
}

export default index;
