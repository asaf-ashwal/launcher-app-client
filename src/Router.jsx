import { Route, Routes } from "react-router";
import Home from "./pages/Home/index";
import AddLauncher from "./pages/AddLauncher/index";
import DetailsLauncher from "./pages/DetailsLauncher/index";
function Router() {
  return (
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/addLauncher" element={<AddLauncher/>} />
        <Route path="/:laucherId" element={<DetailsLauncher/>} />
    </Routes>
  )
}

export default Router