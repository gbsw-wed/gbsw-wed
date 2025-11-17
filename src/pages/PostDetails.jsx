import "./PostDetails.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Preview from "./Preview";
import data from "./data";

function PostDetails({ isSignup, setIsSignup }) {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <>
      <div className="mainBg">
        <div className="mainBgCircle1"></div>
        <div className="mainBgCircle2"></div>

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
        <div className="postPage-write">
          <div className="contentTitle">게시글 작성하기</div>
          <button
            onClick={() => {
              isSignup === true
                ? navigate("/write")
                : alert("로그인을 먼저 진행해주세요");
            }}
            className="postPage-write-btn"
          >
            게시글 작성하기
          </button>
        </div>

        <img className="postPage-img" src="/images/gbs-mascot.png" alt="" />
        <div className="postPage-bg">
          <img
            className="postPage-content-bg"
            src="/images/postPage-content-bg.png"
            alt=""
          />
          <img
            className="postPage-content"
            src="/images/postPage-content.png"
            alt=""
          />

          <div className="postPage-content-titleBox">
            <p className="postDetail-title">{data[id - 1].title}</p>
            <p className="postDetail-lastEdited">{`최근 수정일: ${
              data[id - 1].lastEdited
            }`}</p>
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="postDetail-category-box">
              <p className="postDetail-category">{`분류: ${
                data[id - 1].category
              }`}</p>
            </div>
            <div className="postDetail-content-box">
              <p className="postDetail-content">{data[id - 1].content}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default PostDetails;
