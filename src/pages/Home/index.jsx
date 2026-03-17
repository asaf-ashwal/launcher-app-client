import {useEffect, useState} from "react";
import "./style.css";
import axios from "axios";
import {useSearch} from "../../hooks/search";
import Tr from "../../components/Tr/index";
import Search from "../../components/Search/index";
import {Link, useNavigate} from "react-router";
import {useUserinfo} from "../../hooks/useUserInfo";

function index() {
  const token = useUserinfo((state) => state.token);
  const [lauchers, setLauchers] = useState([]);
  const [err, setErr] = useState("");

  const {dataToShow, searchByCity, searchBytype, searchByDestroyed} =
    useSearch(lauchers);
  const navigation = useNavigate();
  useEffect(() => {
    async function getData() {
      try {
        const {data, status} = await axios.get(
          "http://localhost:3000/api/launchers/",
          {headers: {token}},
        );
        console.log(data);

        setLauchers(data);
      } catch (error) {
        console.log(error);
        setErr(error.message);
      }
    }
    getData();
  }, []);

  return (
    <>
      <nav>
        <Search func={searchByCity} placeholder={"enter city..."} />
        <Search func={searchBytype} placeholder={"enter type..."} />
        <select onChange={(e)=>searchByDestroyed(e.target.value)}>
          <option value="all">all</option>
          <option value={true}>destroyed</option>
          <option value={false}>not destroyed</option>
        </select>
      </nav>
      <h1> All lauchers</h1>
      {err && <p className="error">{err}</p>}
      <table>
        <tr>
          <th>id</th>
          <th>city</th>
          <th>rocketType</th>
          <th>latitude</th>
          <th>longitude</th>
          <th>name</th>
          <th>destroyed</th>
          <th>Nav</th>
        </tr>
        {dataToShow.map((laucher) => {
          return (
            <Tr
              key={laucher.id}
              func={(id) => navigation(`/${id}`)}
              data={laucher}
              text="nviget to lacher"
            />
          );
        })}
      </table>
    </>
  );
}

export default index;
