import { Outlet } from "react-router-dom";
import NavarPage from "./Navbar";

function Layout({ isSignup }) {
  return (
    <div>
      <NavarPage isSignup={isSignup}></NavarPage>
      <Outlet></Outlet>
    </div>
  );
}

export default Layout;
