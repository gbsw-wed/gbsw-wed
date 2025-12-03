import "./PostPage.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Post from "./Post.jsx";
import "./Post.css";  
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function PostPage({ isSignup, setIsSignup }) {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageOffset, setPageOffset] = useState(0);

  const [popularPosts, setPopularPosts] = useState([]);
  const [recommendedPosts, setRecommendedPosts] = useState([]);

  const sortMode = searchParams.get("sort") || "latest";

  useEffect(() => {
    const fetchSidePosts = async () => {
      try {
        const [popRes, recRes] = await Promise.all([
          axios.get("/posts/popular-posts"),
          axios.get("/posts/recommended-posts"),
        ]);
        setPopularPosts(popRes.data.posts || []);
        setRecommendedPosts(recRes.data.posts || []);
      } catch (err) {
        console.error("사이드바 로드 실패", err);
      }
    };
    fetchSidePosts();
  }, []);

  // 게시글 목록 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let url = "/posts";  
        const params = new URLSearchParams();
        if (keyword) params.set("keyword", keyword);
        if (sortMode === "popular") params.set("sort", "views");
        if (sortMode === "recommended") params.set("sort", "likes");
        if (params.toString()) url += `?${params.toString()}`;

        const res = await axios.get(url, { withCredentials: true });
        setPosts(res.data.posts || res.data);
      } catch (err) {
        console.error("게시글 불러오기 오류:", err);
        if (err.response?.status === 401) {
          alert("로그인이 필요합니다!");
          navigate("/login");
        }
      }
    };
    fetchPosts();
  }, [keyword, sortMode, navigate]);

  const postsPerPage = 14;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIdx = (currentPage - 1) * postsPerPage;
  const endIdx = startIdx + postsPerPage;
  const slicedData = posts.slice(startIdx, endIdx);

  const handleSort = (mode) => {
    setSearchParams({ sort: mode });
    setCurrentPage(1);
    setPageOffset(0);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return `${d.getFullYear()}.${(d.getMonth() + 1).toString().padStart(2, "0")}.${d.getDate().toString().padStart(2, "0")}`;
  };

  return (
    <div className="mainBg">
      <div className="mainBgCircle1"></div>
      <div className="mainBgCircle2"></div>

      <div className="postPage-login">
        {isSignup ? (
          <>
            <div className="contentTitle">인기 게시글</div>
            <Link to="/notice" className="content-notice">
              <img src="/images/btn-left.png" alt="더보기" />
            </Link>
            <div className="postPage-login-content">
              {popularPosts.length > 0 ? (
                popularPosts.map((post, idx) => (
                  <Link key={post.post_id} to={`/notice/${post.post_id}`} className="keyword-item">
                    <div style={{ padding: "8px 0", cursor: "pointer" }}>
                      {idx + 1}. {post.title}
                      <span style={{ float: "right", color: "#888", fontSize: "12px" }}>
                        {formatDate(post.created_at)}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div style={{ color: "#aaa" }}>게시글 없음</div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="contentTitle">로그인 하기</div>
            <div className="postPage-login-content">
              <button className="postPage-login-btn" onClick={() => navigate("/login")}>
                로그인
              </button>
              <button className="postPage-singup-btn" onClick={() => navigate("/login?mode=signup")}>
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
            isSignup ? navigate("/write") : alert("로그인을 먼저 진행해주세요");
          }}
          className="postPage-write-btn"
        >
          게시글 작성하기
        </button>
      </div>

      <img className="postPage-img" src="/images/gbs-mascot.png" alt="" />

      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <button onClick={() => handleSort("latest")} className={`sort-btn ${sortMode === "latest" ? "active" : ""}`}>
          최신순
        </button>
        <button onClick={() => handleSort("popular")} className={`sort-btn ${sortMode === "popular" ? "active" : ""}`}>
          인기순
        </button>
        <button onClick={() => handleSort("recommended")} className={`sort-btn ${sortMode === "recommended" ? "active" : ""}`}>
          추천순
        </button>
      </div>

      <div className="postPage-bg">
        <img className="postPage-content-bg" src="/images/postPage-content-bg.png" alt="" />
        <img className="postPage-content" src="/images/postPage-content.png" alt="" />
        <div className="postPage-content-titleBox">
          <div className="postPage-content-titleBox-title">
            <p>제목</p>
            <p># 분류</p>
            <p>글저자</p>
            <p>[최근 수정일]</p>
          </div>
          <Post
            isSignup={isSignup}
            data={slicedData}
            onPostClick={(postId) => navigate(`/notice/${postId}`)}  
          />
        </div>

        <div className="postPage-content-nextBtn">
          <button onClick={() => pageOffset > 0 && setPageOffset(pageOffset - 3)}>
            <img src="/images/btn-top.png" alt="이전" />
          </button>
          {[0, 1, 2].map((i) => {
            const pageNum = pageOffset + i + 1;
            if (pageNum > totalPages) return null;
            return (
              <button
                key={i}
                onClick={() => setCurrentPage(pageNum)}
                className={currentPage === pageNum ? "active" : ""}
              >
                {pageNum}
              </button>
            );
          })}
          <button onClick={() => pageOffset + 3 < totalPages && setPageOffset(pageOffset + 3)}>
            <img src="/images/btn-bottom.png" alt="다음" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostPage;