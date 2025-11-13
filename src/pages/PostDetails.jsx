import "./PostDetails.css";
import { Link, useNavigate } from "react-router-dom";
import Preview from "./Preview";

function PostDetails({ isSignup, setIsSignup }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="mainBg">
        <div className="mainBgCircle1"></div>
        <div className="mainBgCircle2"></div>
        <div className="main-contemt">
          <div className="mainSchool"></div>
        </div>
        <div className="postPage-login">
          {isSignup == true ? (
            <>
              <div className="contentTitle">인기 검색어</div>
              <Link to="/notice" className="content-notice">
                <img src="/images/btn-left.png" alt="" />
              </Link>
              <div className="postPage-login-content">
                <Preview size={10}></Preview>
              </div>
            </>
          ) : (
            <>
              <div className="contentTitle">로그인 하기</div>
              <div className="postPage-login-content">
                <button
                  className="postPage-login-btn"
                  onClick={() => {
                    setIsSignup(false);
                    navigate("/login");
                  }}
                >
                  로그인
                </button>
                <button
                  className="postPage-singup-btn"
                  onClick={() => {
                    setIsSignup(true);
                    navigate("/login");
                  }}
                >
                  회원가입
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default PostDetails;
