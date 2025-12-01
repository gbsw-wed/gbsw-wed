import { Link } from "react-router-dom";
import "./Page404.css";

function Page404() {
  return (
    <div className="page404-container">
      <div id="page404-clouds">
        <div className="page404-cloud page404-x1"></div>
        <div className="page404-cloud page404-x1_5"></div>
        <div className="page404-cloud page404-x2"></div>
        <div className="page404-cloud page404-x3"></div>
        <div className="page404-cloud page404-x4"></div>
        <div className="page404-cloud page404-x5"></div>
      </div>

      <div className="page404-content">
        <div className="page404-number">404</div>
        <hr className="page404-line" />
        <div className="page404-title">THE PAGE</div>
        <div className="page404-subtitle">WAS NOT FOUND</div>

        <Link to="/" className="page404-btn">
          BACK TO MARS
        </Link>
      </div>
    </div>
  );
}

export default Page404;
