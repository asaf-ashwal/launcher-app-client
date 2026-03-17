import {Route, Routes} from "react-router";
import Home from "./pages/Home/index";
import AddLauncher from "./pages/AddLauncher/index";
import DetailsLauncher from "./pages/DetailsLauncher/index";
import UpdateLauncher from "./pages/UpdateLauncher/index";
import Register from "./pages/Register/index";
import UserTable from "./pages/UserTable/index";
import UpdateUser from "./pages/UpdateUser/index";
import Login from "./pages/Login/index";
import ErrorPage from "./pages/ErrorPage/index";
import {useUserinfo} from "./hooks/useUserInfo";
function Router() {
  const {user} = useUserinfo();
  // console.log(user);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/errorPage" element={<ErrorPage />} />
      {(user?.user_type === "admin" || user?.user_type === "modiin") && (
        <>
          <Route path="/seeLaunchers" element={<Home />} />

          <Route path="/:laucherId" element={<DetailsLauncher />} />
        </>
      )}

      {(user?.user_type === "admin" || user?.user_type === "modiin") && (
        <>
          <Route path="/addLauncher" element={<AddLauncher />} />
          <Route path="/update/:laucherId" element={<UpdateLauncher />} />
        </>
      )}
      {user?.user_type === "admin" && (
        <>
          <Route path="/register" element={<Register />} />
          <Route path="/userTable" element={<UserTable />} />
          <Route path="/updateUser/:id" element={<UpdateUser />} />
        </>
      )}
    </Routes>
  );
}

export default Router;
