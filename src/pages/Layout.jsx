import { Outlet } from "react-router-dom";
import NavarPage from "./Navbar";

function Layout() {
  return (
    <div>
      <NavarPage></NavarPage>
      <Outlet></Outlet>
    </div>
  );
}

export default Layout;
