import {useEffect, useState} from "react";
import "./style.css";
import axios from "axios";
import {useSearch} from "../../hooks/search";
import Tr from "../../components/Tr/index";
import Search from "../../components/Search/index";
import {Link} from "react-router";

function index() {
  const [lauchers, setLauchers] = useState([]);
  const [err, setErr] = useState("");

  const {dataToShow, searchByCity, searchBytype} = useSearch(lauchers);

  useEffect(() => {
    async function getData() {
      const {data, status} = await axios.get(
        "http://localhost:3000/api/launchers/",
      );
      if (status !== 200) setErr("server error");
      setLauchers(data);
    }
    getData();
  }, []);
  return (
    <>
      <nav>
        <Search func={searchByCity} placeholder={"enter city..."} />
        <Search func={searchBytype} placeholder={"enter type..."} />
        <button>
          <Link to='/addLauncher'>Add Launcher</Link>
        </button>
      </nav>
      <table>
        <tr>
          <th>id</th>
          <th>city</th>
          <th>rocketType</th>
          <th>latitude</th>
          <th>longitude</th>
          <th>name</th>
          <th>Nav</th>
        </tr>
        {dataToShow.map((laucher) => (
          <Tr key={laucher.name} laucher={laucher} />
        ))}
      </table>
    </>
  );
}

export default index;
