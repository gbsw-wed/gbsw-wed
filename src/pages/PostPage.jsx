import "./PostPage.css";
import { useNavigate } from "react-router-dom";
import Post from "./Post.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import data from "./data.js";

function PostPage({ setIsSignup }) {
  const navigate = useNavigate();

  const [btnCount] = useState([1, 2, 3]);
  const [pageOffset, setPageOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 14;
  const totalPages = Math.ceil(data.length / postsPerPage);

  const startIdx = (currentPage - 1) * postsPerPage;
  const endIdx = startIdx + postsPerPage;
  const slicedData = data.slice(startIdx, endIdx);

  return (
    <div className="mainBg">
      <div className="mainBgCircle1"></div>
      <div className="mainBgCircle2"></div>

      <div className="postPage-login">
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
      </div>

      <div className="postPage-write">
        <div className="contentTitle">게시글 작성하기</div>
        <Link to="/write">
          <button className="postPage-write-btn">게시글 작성하기</button>
        </Link>
      </div>

      <img className="postPage-img" src="/images/gbs-mascot.png" alt="" />

      <div className="postPage-bg">
        <img
          className="postPage-content-bg"
          src="images/postPage-content-bg.png"
          alt=""
        />
        <img
          className="postPage-content"
          src="images/postPage-content.png"
          alt=""
        />

        <div className="postPage-content-titleBox">
          <div className="postPage-content-titleBox-title">
            <p>제목</p>
            <p># 분류</p>
            <p>글저자</p>
            <p>[최근 수정일]</p>
          </div>
          <Post data={slicedData}></Post>
        </div>

        <div className="postPage-content-nextBtn">
          <button
            onClick={() => {
              if (pageOffset > 0) setPageOffset(pageOffset - 3);
            }}
            className="postPage-content-nextBtn-btn1"
          >
            <img src="/images/btn-top.png" alt="" />
          </button>

          {btnCount.map((Item, index) => {
            const pageNum = Item + pageOffset;
            if (pageNum > totalPages) return null;
            return (
              <button
                key={index}
                onClick={() => setCurrentPage(pageNum)}
                className={`postPage-content-nextBtn-btn${Item + 1} ${
                  currentPage === pageNum ? "active" : ""
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => {
              if (pageOffset + 3 < totalPages) setPageOffset(pageOffset + 3);
            }}
            className="postPage-content-nextBtn-btn5"
          >
            <img src="/images/btn-bottom.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
