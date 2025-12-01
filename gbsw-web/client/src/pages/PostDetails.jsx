import "./PostDetails.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function PostDetails({ isSignup, setIsSignup }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [popularPosts, setPopularPosts] = useState([]);
  const [recommendedPosts, setRecommendedPosts] = useState([]);

  // 게시글 상세 + 사이드바 데이터 불러오기
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [postRes, popRes, recRes] = await Promise.all([
          axios.get(`/posts/${id}`),                    // 프록시 사용!
          axios.get("/posts/popular-posts"),
          axios.get("/posts/recommended-posts"),
        ]);
        setPost(postRes.data);
        setPopularPosts(popRes.data.posts || []);
        setRecommendedPosts(recRes.data.posts || []);
      } catch (err) {
        console.error("로드 실패", err);
        alert("게시글을 불러오지 못했습니다.");
      }
    };
    fetchAll();
  }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return `${d.getFullYear()}.${(d.getMonth() + 1).toString().padStart(2, "0")}.${d.getDate().toString().padStart(2, "0")}`;
  };

  if (!post) return <div className="loading">불러오는 중...</div>;

  return (
    <>
      <div className="mainBg">
        <div className="mainBgCircle1"></div>
        <div className="mainBgCircle2"></div>

        {/* 사이드바: 인기/추천 게시글 */}
        <div className="postPage-login">
          {isSignup ? (
            <>
              {/* 인기 게시글 */}
              <div className="contentTitle">인기 게시글</div>
              <Link to="/notice" className="content-notice">
                <img src="/images/btn-left.png" alt="더보기" />
              </Link>
              <div className="postPage-login-content">
                {popularPosts.length > 0 ? (
                  popularPosts.map((p, idx) => (
                    <Link key={p.post_id} to={`/notice/${p.post_id}`} className="keyword-item">
                      <div style={{ padding: "10px 0", cursor: "pointer" }}>
                        {idx + 1}. {p.title}
                        <span style={{ float: "right", color: "#888", fontSize: "12px" }}>
                          {formatDate(p.created_at)}
                        </span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div style={{ color: "#aaa", padding: "20px 0" }}>게시글 없음</div>
                )}
              </div>
            </>
          ) : (
            // 로그인 유도
            <>
              <div className="contentTitle">로그인 하기</div>
              <div className="postPage-login-content">
                <button className="postPage-login-btn" onClick={() => navigate("/login")}>
                  로그인
                </button>
                <button className="postPage-singup-btn" onClick={() => navigate("/login")}>
                  회원가입
                </button>
              </div>
            </>
          )}
        </div>

        {/* 게시글 작성 버튼 */}
        <div className="postPage-write">
          <div className="contentTitle">게시글 작성하기</div>
          <button
            onClick={() => (isSignup ? navigate("/write") : alert("로그인 해주세요!"))}
            className="postPage-write-btn"
          >
            게시글 작성하기
          </button>
        </div>

        <img className="postPage-img" src="/images/gbs-mascot.png" alt="" />

        {/* 메인 게시글 내용 */}
        <div className="postPage-bg">
          <img className="postPage-content-bg" src="/images/postPage-content-bg.png" alt="" />
          <img className="postPage-content" src="/images/postPage-content.png" alt="" />

          <div className="postPage-content-titleBox">
            <p className="postDetail-title">{post.title}</p>
            <div className="postDetail-info-line">
              <span className="postDetail-author">작성자: {post.username}</span>
              <span className="postDetail-lastEdited">
                최근 수정일: {formatDate(post.updated_at || post.created_at)}
              </span>
            </div>
            <div className="postDetail-category-box">
              <p className="postDetail-category">분류: {post.tag || "없음"}</p>
            </div>

            <div className="postDetail-content-box">
              <p className="postDetail-content">{post.content}</p>
            </div>

            {post.file_path && (
              <img
                className="postDetail-image"
                src={`http://localhost:3000${post.file_path}`}
                alt="첨부 이미지"
                style={{ maxWidth: "100%", marginTop: "20px", borderRadius: "12px" }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PostDetails;