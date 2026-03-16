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
      try {
        const {data, status} = await axios.get(
          "http://localhost:3000/api/launchers/",
        );
        setLauchers(data);
      } catch (error) {
        console.log(error);
        setErr(error.message);
      }
    }
    getData();
  }, []);
  console.log("from index: ", dataToShow.length);

  return (
    <>
      <nav>
        <Search func={searchByCity} placeholder={"enter city..."} />
        <Search func={searchBytype} placeholder={"enter type..."} />
        <button>
          <Link to="/addLauncher">Add Launcher</Link>
        </button>
      </nav>
      {err && <p className="error">{err}</p>}
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
        {dataToShow.map((laucher) => {
          return <Tr key={laucher.id} laucher={laucher} />;
        })}
      </table>
    </>
  );
}

export default index;
