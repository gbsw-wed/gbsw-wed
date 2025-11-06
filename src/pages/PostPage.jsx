import "./PostPage.css";
import { useNavigate } from "react-router-dom";

function PostPage({ setIsSignup }) {
  const navigate = useNavigate();

  return (
    <div className="mainBg">
      <div className="mainBgCircle1"></div>
      <div className="mainBgCircle2"></div>

      <div className="postPage-login">
        <div className="postPage-login-content">
          <button
            onClick={() => {
              setIsSignup(false);
              navigate("/login");
            }}
          ></button>
          <button
            onClick={() => {
              setIsSignup(true);
              navigate("/login");
            }}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
