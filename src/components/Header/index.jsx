import {Link, useNavigate} from "react-router";
import "./style.css";
import {useUserinfo} from "../../hooks/useUserInfo";

function index() {
  const navigation = useNavigate();
  const {user, setLogout} = useUserinfo();
  function handleLogOut() {
    setLogout();
    navigation('/')
  }
  return (
    <header>
      <nav>
        {(user?.user_type === "admin" || user?.user_type === "modiin") && (
          <>
            <Link to="/">
              <button>Login</button>
            </Link>

            <Link to="addLauncher">
              <button>Add Launcher</button>
            </Link>
          </>
        )}

        {user?.user_type === "admin" && (
          <>
            <Link to="register">
              <button>Add user</button>
            </Link>
            <Link to="userTable">
              <button>User Table</button>
            </Link>
          </>
        )}

        {user && (
          <>
            <Link to="seeLaunchers">
              <button>seeLaunchers</button>
            </Link>
            <button onClick={handleLogOut}>log Out</button>
          </>
        )}
      </nav>
    </header>
  );
}

export default index;
